using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Web.Http;
using Match.Fishing.Models;
using Newtonsoft.Json;

namespace Match.Fishing.Controllers.v1
{
    public class MatchesController : ApiController
    {
        [Route("api/v1/matches")]
        public IEnumerable<Models.Match> Get()
        {
            string matchesJsonFilePath = HostingEnvironment.MapPath(@"~/App_Data/json/matches.json");

            if (string.IsNullOrWhiteSpace(matchesJsonFilePath)) throw new ArgumentNullException();

            string jsonContent = File.ReadAllText(matchesJsonFilePath);

            var matches = JsonConvert.DeserializeObject<List<Models.Match>>(jsonContent);

            return matches;
        }

        [Route("api/v1/matches/{id}")]
        public Models.Match Get([FromUri]int id)
        {
            List<Models.Match> matches = Get().ToList();
            Models.Match matchToReturn = matches.SingleOrDefault(match => match.Id == id);
            return matchToReturn;
        }

        [Route("api/v1/anglers/{anglerId}/matches")]
        public IEnumerable<Models.Match> GetMatchesForAngler([FromUri] int anglerId)
        {
            List<Models.Match> matches = Get().ToList();
            IEnumerable<Models.Match> anglerMatches = matches.Where(m => m.MatchEntries.Any(me => me.AnglerId == anglerId));
            return anglerMatches;
        }

        [Route("api/v1/matches/{id}/pairs")]
        public IEnumerable<PairResult> GetPairsMatch([FromUri]int id)
        {
            Models.Match match = Get(id);
            var pairResults = new List<PairResult>();

            if (!match.IsPairs) return pairResults;

            foreach (MatchEntry matchEntry in match.MatchEntries)
            {
                bool toAdd = !pairResults.Any(pair => pair.Peg1 == matchEntry.Peg || pair.Peg2 == matchEntry.Peg);

                if (!toAdd) continue;

                var matchEntryPair = new List<MatchEntry> { matchEntry };

                MatchEntry pairedMatchEntry = match.MatchEntries.Single(me => me.PairedWithPeg == matchEntry.Peg);
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

            return pairResults;
        }

        // POST: api/Matches
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Matches/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Matches/5
        public void Delete(int id)
        {
        }
    }
}
