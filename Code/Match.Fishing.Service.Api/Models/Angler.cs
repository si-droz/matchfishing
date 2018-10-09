using Newtonsoft.Json;

namespace Match.Fishing.Models
{
    public class Angler
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("forename")]
        public string Forename { get; set; }
        [JsonProperty("surname")]
        public string Surname { get; set; }
        [JsonProperty("nickname")]
        public string NickName { get; set; }
    }
}