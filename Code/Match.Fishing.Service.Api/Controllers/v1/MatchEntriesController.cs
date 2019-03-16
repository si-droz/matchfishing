using Match.Fishing.Enums;
using Match.Fishing.ExtensionMethods;
using Match.Fishing.Models;
using Match.Fishing.Services;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Match.Fishing.Controllers.v1
{
    public class MatchEntriesController : ApiController
    {
        private const double OuncesInPound = 16.0;

        [Route("api/v1/matches/{matchId}/entries")]
        [HttpGet]
        public IHttpActionResult GetMatchEntries(int matchId)
        {
            FishingMatch fishingMatch = DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches)
                                                       .SingleOrDefault(match => match.Id == matchId);

            if (fishingMatch == null) return NotFound();

            return Ok(fishingMatch.MatchEntries);
        }

        // POST: api/Matches
        [Route("api/v1/matches/{matchId}/entries")]
        [HttpPost]
        public IHttpActionResult Post(int matchId, [FromBody] EntryToAdd entryToAdd)
        {
            List<FishingMatch> fishingMatches = DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches).ToList();

            FishingMatch fishingMatch = fishingMatches.SingleOrDefault(match => match.Id == matchId);

            if (fishingMatch == null) return NotFound();

            var matchEntry = new MatchEntry
            {
                AnglerName = entryToAdd.AnglerName,
                AnglerId = entryToAdd.AnglerId,
                Peg = entryToAdd.Peg,
                Weight = entryToAdd.Pounds + (entryToAdd.Ounces / OuncesInPound)
            };

            fishingMatch.MatchEntries.Add(matchEntry);

            fishingMatch.CalculateMatchPoints();

            DataFileService.WriteDataFile(DataFileType.Matches, fishingMatches);

            return Created(string.Empty, entryToAdd);
        }
    }
}