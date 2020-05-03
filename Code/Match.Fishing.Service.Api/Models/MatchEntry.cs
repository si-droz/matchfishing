namespace Match.Fishing.Models
{
    using Newtonsoft.Json;

    public class MatchEntry
    {
        [JsonProperty("peg")]
        public int Peg { get; set; }

        [JsonProperty("pairedWithPeg")]
        public int PairedWithPeg { get; set; }

        [JsonProperty("weight")]
        public double Weight { get; set; }

        [JsonProperty("position")]
        public int Position { get; set; }

        [JsonProperty("points")]
        public double Points { get; set; }

        [JsonProperty("anglerId")]
        public int AnglerId { get; set; }

        [JsonProperty("anglerName")]
        public string AnglerName { get; set; }

        [JsonProperty("section")]
        public int Section { get; set; }
    }
}