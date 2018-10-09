using System.Collections.Generic;
using Newtonsoft.Json;

namespace Match.Fishing.Models
{
    public class ChampionshipAnglerDetails
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("rounds")]
        public List<ChampionshipRound> Rounds { get; set; }
        [JsonProperty("pointsTotal")]
        public double PointsTotal { get; set; }
        [JsonProperty("weightTotal")]
        public double WeightTotal { get; set; }
        [JsonProperty("matchCount")]
        public int MatchCount { get; set; }
    }
}