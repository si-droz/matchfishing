using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Match.Fishing.Models
{
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

        //public bool Equals(MatchEntry other)
        //{
        //    if(ReferenceEquals(null, other)) return false;
        //    if(ReferenceEquals(this, other)) return true;
        //    if(!other.PairedWithPeg.HasValue) return true;
        //    return Peg == other.PairedWithPeg.Value ;
        //}

        //public override bool Equals(object obj)
        //{
        //    if(ReferenceEquals(null, obj)) return false;
        //    if(ReferenceEquals(this, obj)) return true;
        //    return obj.GetType() == GetType() && Equals((MatchEntry) obj);
        //}

        //public override int GetHashCode()
        //{
        //    unchecked
        //    {
        //        return (Peg * 397) ^ PairedWithPeg.GetHashCode();
        //    }
        //}
    }

    //public class PairsMatchEntryComparer : IEqualityComparer<MatchEntry>
    //{
    //    public bool Equals(MatchEntry x, MatchEntry y)
    //    {
    //        if (x == null ||
    //           y == null ||
    //           !x.PairedWithPeg.HasValue ||
    //           !y.PairedWithPeg.HasValue)
    //            return false;
            
    //        return x.Peg == y.PairedWithPeg;
    //    }

    //    public int GetHashCode(MatchEntry obj)
    //    {
    //        unchecked
    //        {
    //            var hash = (int)2166136261;
    //            hash = (hash * 16777619) ^ obj.Peg.GetHashCode();
    //            hash = (hash * 16777619) ^ obj.PairedWithPeg.GetHashCode();
    //            return hash;
    //        }

    //    }
    //}
}