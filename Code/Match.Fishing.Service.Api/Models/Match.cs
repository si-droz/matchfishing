using System.Collections.Generic;
using Newtonsoft.Json;

namespace Match.Fishing.Models
{
    public class Match
    {
        public Match()
        {
            MatchEntries = new List<MatchEntry>();
        }
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("seasonId")]
        public int SeasonId { get; set; }
        [JsonProperty("season")]
        public string Season { get; set; }
        [JsonProperty("date")]
        public string Date { get; set; }
        [JsonProperty("venue")]
        public string Venue { get; set; }
        [JsonProperty("lake")]
        public string Lake { get; set; }
        [JsonProperty("leagueId")]
        public int LeagueId { get; set; }
        [JsonProperty("leagueMatchNo")]
        public string LeagueMatchNo { get; set; }
        [JsonProperty("league")]
        public string League { get; set; }
        [JsonProperty("noOfPegs")]
        public string NoOfPegs { get; set; }
        [JsonProperty("poolsFee")]
        public decimal PoolsFee { get; set; }
        [JsonProperty("dayTicketFee")]
        public decimal DayTicketFee { get; set; }
        [JsonProperty("isTrophyMatch")]
        public bool IsTrophyMatch { get; set; }
        [JsonProperty("isPairs")]
        public bool IsPairs { get; set; }
        [JsonProperty("trophyName")]
        public string TrophyName { get; set; }
        [JsonProperty("matchEntries")]
        public List<MatchEntry> MatchEntries { get; set; }
    }
}