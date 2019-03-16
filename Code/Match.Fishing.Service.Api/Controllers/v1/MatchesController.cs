using Match.Fishing.Enums;
using Match.Fishing.ExtensionMethods;
using Match.Fishing.Models;
using Match.Fishing.Services;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

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

        [Route("api/v1/matches/{matchId}/calculate-points")]
        [HttpPost]
        public IHttpActionResult CalculatePoints(int matchId)
        {
            List<FishingMatch> fishingMatches = Get().ToList();

            FishingMatch fishingMatch = fishingMatches.SingleOrDefault(match => match.Id == matchId);

            if (fishingMatch == null) return NotFound();

            fishingMatch.CalculateMatchPoints();

            DataFileService.WriteDataFile(DataFileType.Matches, fishingMatches);

            return Ok();
        }        
    }
}
