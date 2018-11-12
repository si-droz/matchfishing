using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;
using Newtonsoft.Json;

namespace Match.Fishing.Controllers.v1
{
    public class MatchesController : ApiController
    {
        [Route("api/v1/matches")]
        public IEnumerable<FishingMatch> Get()
        {
            return DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches);
        }

        [Route("api/v1/matches/{id}")]
        public FishingMatch Get([FromUri]int id)
        {
            List<FishingMatch> matches = Get().ToList();
            FishingMatch fishingMatchToReturn = matches.SingleOrDefault(match => match.Id == id);
            return fishingMatchToReturn;
        }

        [Route("api/v1/seasons/{seasonId}/matches")]
        public IEnumerable<FishingMatch> GetMatchesForSeason([FromUri]int seasonId)
        {
            List<FishingMatch> matches = Get().ToList();
            IEnumerable<FishingMatch> matchesToReturn = matches.Where(match => match.SeasonId == seasonId)
                                                               .OrderBy(match => match.Date);
            return matchesToReturn;
        }

        [Route("api/v1/anglers/{anglerId}/matches")]
        public IEnumerable<FishingMatch> GetMatchesForAngler([FromUri] int anglerId)
        {
            List<FishingMatch> matches = Get().ToList();
            IEnumerable<FishingMatch> anglerMatches = matches.Where(m => m.MatchEntries.Any(me => me.AnglerId == anglerId));
            return anglerMatches;
        }

        [Route("api/v1/matches/{id}/pairs")]
        public IEnumerable<PairResult> GetPairsMatch([FromUri]int id)
        {
            FishingMatch fishingMatch = Get(id);
            var pairResults = new List<PairResult>();

            if (!fishingMatch.IsPairs) return pairResults;

            foreach (MatchEntry matchEntry in fishingMatch.MatchEntries)
            {
                bool toAdd = !pairResults.Any(pair => pair.Peg1 == matchEntry.Peg || pair.Peg2 == matchEntry.Peg);

                if (!toAdd) continue;

                var matchEntryPair = new List<MatchEntry> { matchEntry };

                MatchEntry pairedMatchEntry = fishingMatch.MatchEntries.Single(me => me.PairedWithPeg == matchEntry.Peg);
                matchEntryPair.Add(pairedMatchEntry);

                var pairResult = new PairResult
                {
                    Angler1 = matchEntryPair[0].AnglerName,
                    Angler2 = matchEntryPair[1].AnglerName,
                    Peg1 = matchEntryPair[0].Peg,
                    Peg2 = matchEntryPair[1].Peg,
                    Weight = matchEntryPair[0].Weight + matchEntryPair[1].Weight
                };

                if (pairResult.Peg1 == pairResult.Peg2)
                {
                    pairResult.Peg2 = null;
                    pairResult.Angler2 = "(weight doubled)";
                }

                pairResults.Add(pairResult);

            }

            return pairResults.OrderByDescending(result => result.Weight);
        }

        // POST: api/Matches
        [Route("api/v1/matches/{matchId}/entries")]
        [HttpPost]
        public IHttpActionResult Post(int matchId, [FromBody] EntryToAdd entryToAdd)
        {
            List<FishingMatch> fishingMatches = Get().ToList();

            FishingMatch fishingMatch = fishingMatches.SingleOrDefault(match => match.Id == matchId);

            if (fishingMatch == null) return NotFound();

            fishingMatch.MatchEntries.Add(new MatchEntry
            {
                AnglerName = entryToAdd.AnglerName,
                AnglerId = entryToAdd.AnglerId,
                Peg = entryToAdd.Peg,
                Weight = entryToAdd.Pounds + (entryToAdd.Ounces / 16)
            });

            DataFileService.WriteDataFile(DataFileType.Matches, fishingMatches);

            return Created(string.Empty, entryToAdd);
        }

        [Route("api/v1/matches/{matchId}/calculate-points")]
        [HttpPost]
        public IHttpActionResult CalculatePoints(int matchId)
        {
            List<FishingMatch> fishingMatches = Get().ToList();

            FishingMatch fishingMatch = fishingMatches.SingleOrDefault(match => match.Id == matchId);

            if (fishingMatch == null) return NotFound();

            CopyCalculatedMatchEntriesToMatch(fishingMatch);

            DataFileService.WriteDataFile(DataFileType.Matches, fishingMatches);

            return Ok();
        }

        private static void CopyCalculatedMatchEntriesToMatch(FishingMatch fishingMatch)
        {
            List<MatchEntry> sortedMatchEntries = GetMatchEntriesSortedByWeight(fishingMatch);

            foreach (MatchEntry matchEntry in fishingMatch.MatchEntries)
            {
                MatchEntry calculatedMatchEntry = sortedMatchEntries.SingleOrDefault(entry => entry.AnglerId == matchEntry.AnglerId);
                if (calculatedMatchEntry == null) throw new Exception("Angler not found");

                matchEntry.Position = calculatedMatchEntry.Position;
                matchEntry.Points = calculatedMatchEntry.Points;
            }
        }

        private static List<MatchEntry> GetMatchEntriesSortedByWeight(FishingMatch fishingMatch)
        {
            List<MatchEntry> sortedMatchEntries = fishingMatch.MatchEntries.OrderByDescending(matchEntry => matchEntry.Weight).ToList();

            PositionToPointsMapping positionToPointsMapping = DataFileService.GetDataFile<PositionToPointsMapping>(DataFileType.PositionToPointsMapping)
                                                                             .SingleOrDefault(mapping => mapping.Id == fishingMatch.PositionToPointsMappingId);

            if (positionToPointsMapping == null) throw new Exception("Position to points mapping not found");

            for (var index = 0; index < sortedMatchEntries.Count; index++)
            {
                sortedMatchEntries[index].Position = index + 1;

                if (Math.Abs(sortedMatchEntries[index].Weight) <= 0)
                {
                    sortedMatchEntries[index].Points = positionToPointsMapping.DidNotWeighPoints;
                    continue;
                }

                if (index > positionToPointsMapping.PositionToPoints.Count - 1)
                {
                    sortedMatchEntries[index].Points = positionToPointsMapping.PositionToPoints.Last().Points;
                    continue;
                }

                sortedMatchEntries[index].Points = positionToPointsMapping.PositionToPoints[index].Points;
            }

            return sortedMatchEntries;
        }        
    }

    public class EntryToAdd
    {
        [JsonProperty("peg")]
        public int Peg { get; set; }

        [JsonProperty("anglerId")]
        public int AnglerId { get; set; }

        [JsonProperty("anglerName")]
        public string AnglerName { get; set; }

        [JsonProperty("pounds")]
        public int Pounds { get; set; }

        [JsonProperty("ounces")]
        public int Ounces { get; set; }
    }
}
