using Newtonsoft.Json;

namespace Match.Fishing.Models
{
    public class ChampionshipRound
    {
        [JsonProperty("number")]
        public int Number { get; set; }
        [JsonProperty("weight")]
        public double Weight { get; set; }
        [JsonProperty("points")]
        public double Points { get; set; }
        [JsonIgnore]
        public bool MatchFished { get; set; }
    }
}