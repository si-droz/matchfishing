using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Match.Fishing.Controllers.v1
{
    public class LeaguesController : ApiController
    {
        [Route("api/v1/leagues")]
        public IEnumerable<League> Get()
        {
            return DataFileService.GetDataFile<League>(DataFileType.Leagues);
        }

        [Route("api/v1/leagues/{id}")]
        public League Get([FromUri]int id)
        {
            List<League> leagues = Get().ToList();
            League leagueToReturn = leagues.SingleOrDefault(league => league.Id == id);
            return leagueToReturn;
        }

        [Route("api/v1/leagues/current-season")]
        public IEnumerable<League> GetLeaguesForCurrentSeason()
        {
            string currentSeason = GetCurrentSeason();

            IEnumerable<League> leagues = Get().Where(league => league.Season == currentSeason);

            return leagues;
        }

        internal static string GetCurrentSeason()
        {
            const int april = 4;
            DateTime today = DateTime.Now;
            int thisMonth = today.Month;
            int thisYear = today.Year - 2000;
            string season = thisMonth > april ?
                       $"{thisYear}/{thisYear + 1}" :
                       $"{thisYear - 1}/{thisYear}";

            return season;
        }
    }
}
