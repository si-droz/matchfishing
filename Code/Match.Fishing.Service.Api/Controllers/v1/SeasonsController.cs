using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;

namespace Match.Fishing.Controllers.v1
{
    public class SeasonsController : ApiController
    {
        [Route("api/v1/seasons")]
        public List<string> Get()
        {
            IEnumerable<FishingMatch> matches = DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches);
            List<string> seasons = matches.GroupBy(match => match.Season)
                                                 .Select(group => group.Key)
                                                 .ToList();
            seasons.Insert(0, "All");
            return seasons;
        }

        [Route("api/v1/seasons/{id}")]
        public string Get([FromUri] int id)
        {
            IEnumerable<FishingMatch> matches = DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches);
            string season = matches.GroupBy(match => new { match.SeasonId, match.Season })
                                                .Where(group => group.Key.SeasonId == id)
                                                .Select(grp => grp.Key.Season)
                                                .FirstOrDefault();

            return season;
        }
    }
}
