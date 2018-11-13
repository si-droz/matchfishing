using Newtonsoft.Json;

namespace Match.Fishing.Models
{
    public class EntryToAdd
    {
        [JsonProperty("peg")]
        public int Peg { get; set; }

        [JsonProperty("anglerId")]
        public int AnglerId { get; set; }

        [JsonProperty("anglerName")]
        public string AnglerName { get; set; }

        [JsonProperty("pounds")]
        public int Pounds { get; set; }

        [JsonProperty("ounces")]
        public int Ounces { get; set; }
    }
}