using Newtonsoft.Json;

namespace Match.Fishing.Models
{
    public class League
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("season")]
        public string Season { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("noOfRounds")]
        public int NoOfRounds { get; set; }

        [JsonProperty("countingRounds")]
        public int CountingRounds { get; set; }
    }
}