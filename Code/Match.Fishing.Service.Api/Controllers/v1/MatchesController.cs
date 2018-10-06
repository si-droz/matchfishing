using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Web.Http;
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

        [Route("api/v1/matches")]
        public Models.Match Get([FromUri]int id)
        {
            List<Models.Match> matches = Get().ToList();
            Models.Match matchToReturn = matches.SingleOrDefault(match => match.Id == id);
            return matchToReturn;
        }

        public void GetMatchesForAngler()
        {
            //    service.getMatchesForAngler = function getMatchesForAngler($http, anglerId)
            //    {
            //        return $http.get("/json/matches.json")
            //            .then(function(response) {
            //            var matches = response.data;
            //            var filteredMatches = [];
            //            var filteredMatchEntries = [];

            //            for (var index = 0; index < matches.length; index++)
            //            {
            //                filteredMatchEntries = [];
            //                if (matches[index].matchEntries !== undefined && matches[index].matchEntries !== null)
            //                {
            //                    for (var matchEntryIndex = 0; matchEntryIndex < matches[index].matchEntries.length; matchEntryIndex++)
            //                    {
            //                        if (matches[index].matchEntries[matchEntryIndex].anglerId === anglerId)
            //                        {
            //                            filteredMatchEntries.push(matches[index].matchEntries[matchEntryIndex]);
            //                        }
            //                    }
            //                    if (filteredMatchEntries.length > 0)
            //                    {
            //                        matches[index].matchEntries = filteredMatchEntries;
            //                        filteredMatches.push(matches[index]);
            //                    }
            //                }
            //            }

            //            return filteredMatches;
            //        });
            //    };
        }

        public void GetPairsMatch()
        {

            //    service.getPairs = function getPairs(match)
            //    {
            //        var pairs = []
            //        if (match.isPairs)
            //        {
            //            for (var index = 0; index < match.matchEntries.length; index++)
            //            {
            //                var matchEntry = match.matchEntries[index];

            //                var toAdd = true;
            //                pairs.forEach(function(pair) {
            //                    if (pair.peg1 == matchEntry.peg || pair.peg2 == matchEntry.peg)
            //                    {
            //                        toAdd = false;
            //                    }
            //                }, this);

            //            if (toAdd)
            //            {
            //                var matchEntryPair = [];

            //                matchEntryPair.push(matchEntry);

            //                match.matchEntries.forEach(function(me) {
            //                    if (matchEntry.pairedWithPeg == me.peg)
            //                    {
            //                        matchEntryPair.push(me);
            //                    }
            //                }, this);

            //                var pair = {
            //                        peg1: matchEntryPair[0].peg,
            //                        peg2: matchEntryPair[1].peg,
            //                        angler1: matchEntryPair[0].anglerName,
            //                        angler2: matchEntryPair[1].anglerName,
            //                        weight: matchEntryPair[0].weight + matchEntryPair[1].weight
            //                    }

            //            if (pair.peg1 == pair.peg2)
            //            {
            //                pair.peg2 = null
            //                        pair.angler2 = '(weight doubled)'
            //                    }

            //            pairs.push(pair);
            //        }
            //    }
            //}
            //        return pairs;
            //    };
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
