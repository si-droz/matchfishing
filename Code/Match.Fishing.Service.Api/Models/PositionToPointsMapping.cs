using System.Collections.Generic;
using Newtonsoft.Json;


namespace Match.Fishing.Models
{
    public class PositionToPointsMapping
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("dnwPoints")]
        public int DidNotWeighPoints { get; set; }
        [JsonProperty("positionToPoints")]
        public List<PositionToPoint> PositionToPoints { get; set; }
    }

    public class PositionToPoint
    {
        [JsonProperty("position")]
        public int Position { get; set; }
        [JsonProperty("points")]
        public double Points { get; set; }
    }
}