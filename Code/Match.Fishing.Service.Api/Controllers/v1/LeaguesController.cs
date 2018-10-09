using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;

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
    }
}
