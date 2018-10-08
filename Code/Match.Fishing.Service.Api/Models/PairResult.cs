using Newtonsoft.Json;

namespace Match.Fishing.Models
{
    public class PairResult
    {
        [JsonProperty("peg1")]
        public int Peg1 { get; set; }
        [JsonProperty("peg2")]
        public int? Peg2 { get; set; }
        [JsonProperty("angler1")]
        public string Angler1 { get; set; }
        [JsonProperty("angler2")]
        public string Angler2 { get; set; }
        [JsonProperty("weight")]
        public double Weight { get; set; }
    }
}