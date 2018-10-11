using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;

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

            return (from anglerName in anglerNames
                    let rounds = GetChampionshipRounds(matches, anglerName)
                    select new ChampionshipAnglerDetails
                           {
                               Rounds = rounds,
                               PointsTotal = rounds.Sum(matchEntry => matchEntry.Points),
                               WeightTotal = rounds.Sum(matchEntry => matchEntry.Weight),
                               Name = anglerName,
                               MatchCount = rounds.Count(matchEntry => matchEntry.MatchFished)
                           }).ToList();
        }

        private static List<ChampionshipRound> GetChampionshipRounds(IEnumerable<FishingMatch> matches, string anglerName)
        {
            var rounds = new List<ChampionshipRound>();
            var championshipRoundIndex = 1;
            foreach(FishingMatch match in matches)
            {
                MatchEntry anglerMatchEntry = match.MatchEntries.SingleOrDefault(matchEntry => matchEntry.AnglerName == anglerName);
                var championshipRound = new ChampionshipRound
                                        {
                                            Number = championshipRoundIndex,
                                            Weight = 0,
                                            Points = 0,
                                            MatchFished = false
                                        };

                if(anglerMatchEntry != null)
                {
                    championshipRound.Weight = anglerMatchEntry.Weight;
                    championshipRound.Points = anglerMatchEntry.Points;
                    championshipRound.MatchFished = true;
                }

                rounds.Add(championshipRound);
                championshipRoundIndex += 1;
            }

            return rounds;
        }
    }
}
