using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;
using Newtonsoft.Json;

namespace Match.Fishing.Controllers.v1
{
    public class ChampionshipsController : ApiController
    {
        [Route("api/v1/championships/{seasonId}/anglers")]
        public List<ChampionshipAnglerDetails> Get([FromUri] int seasonId)
        {
            List<FishingMatch> matches = DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches)
                                                        .Where(match => match.SeasonId == seasonId)
                                                        .ToList();

            IEnumerable<string> anglerNames = matches.SelectMany(match => match.MatchEntries)
                                                     .GroupBy(matchEntry => matchEntry.AnglerName)
                                                     .Select(group => group.Key);

            var details = new List<ChampionshipAnglerDetails>();
            foreach (string anglerName in anglerNames)
            {
                //TODO include rounds not fished.
                IEnumerable<MatchEntry> anglerMatchEntries = matches.SelectMany(m => m.MatchEntries.Where(me => me.AnglerName == anglerName));

                List<ChampionshipRound> rounds = anglerMatchEntries.Select((matchEntry, index) => new ChampionshipRound
                {
                    Number = index + 1,
                    Weight = matchEntry.Weight,
                    Points = matchEntry.Points
                }).ToList();

                var championship = new ChampionshipAnglerDetails
                {
                    Rounds = rounds,
                    PointsTotal = rounds.Sum(x => x.Points),
                    WeightTotal = rounds.Sum(x => x.Weight),
                    Name = anglerName,
                    MatchCount = rounds.Count
                };

                details.Add(championship);
            }

            return details;
        }
        //service.getChampionship = function getChampionship($http, seasonId)
        //{
        //        var anglers = getAnglerDetails(uniqueAnglers, championshipMatches);

        //        return anglers;
        //    });
        //};

        //    function getAnglerDetails(uniqueAnglers, matches)
        //    {
        //        var anglers = [];
        //        for (var anglerIndex = 0; anglerIndex < uniqueAnglers.length; anglerIndex++)
        //        {
        //            var angler = {
        //            name: uniqueAnglers[anglerIndex],
        //            rounds: [],
        //            pointsTotal: 0,
        //            weightTotal: 0,
        //            matchCount: 0
        //            };

        //        for (var matchIndex = 0; matchIndex < matches.length; matchIndex++)
        //        {
        //            angler = getAnglerRounds(matches[matchIndex], matchIndex, angler)
        //        }

        //        anglers.push(angler);
        //    }

        //    return anglers;
        //};

        //function getAnglerRounds(match, matchIndex, angler)
        //{
        //    var roundAdded = false;
        //    var round = {
        //        number: matchIndex,
        //        weight: 0,
        //        points: 0
        //    }

        //    for (var matchEntryIndex = 0; matchEntryIndex<match.matchEntries.length; matchEntryIndex++) {
        //        var matchEntry = match.matchEntries[matchEntryIndex];

        //        if (angler.name == matchEntry.anglerName) {
        //            round.weight = matchEntry.weight;
        //            round.points = matchEntry.points;
        //            angler.rounds.push(round);
        //            angler.pointsTotal += round.points;
        //            angler.weightTotal += round.weight;
        //            angler.matchCount += 1;
        //            roundAdded = true;
        //        }
        //    }

        //    if (!roundAdded) {
        //        angler.rounds.push(round);
        //    }

        //    return angler;
        //};
    }
}
