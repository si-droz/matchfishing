using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;
using Newtonsoft.Json;

namespace Match.Fishing.Controllers.v1
{
    public class SeasonsController : ApiController
    {
        [Route("api/v1/season-names")]
        public List<string> Get()
        {
            IEnumerable<FishingMatch> matches = DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches);
            List<string> seasons = matches.GroupBy(match => match.Season)
                                                 .Select(group => group.Key)
                                                 .ToList();
            seasons.Insert(0, "All");
            return seasons;
        }

        [Route("api/v1/season-names/{id}")]
        public string Get([FromUri] int id)
        {
            string description = GetSeasons().SingleOrDefault(season => season.Id == id)?.Description;

            return description;
        }

        [Route("api/v1/seasons")]
        public IEnumerable<Season> GetSeasons()
        {
            IEnumerable<FishingMatch> matches = DataFileService.GetDataFile<FishingMatch>(DataFileType.Matches);
            IEnumerable<Season> seasons = matches.GroupBy(match => new { match.SeasonId, match.Season })
                                                 .Select(group => new Season
                                                 {
                                                     Id = group.Key.SeasonId,
                                                     Description = group.Key.Season
                                                 });
            return seasons;
        }
    }

    public class Season
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("season")]
        public string Description { get; set; }
    }
}
