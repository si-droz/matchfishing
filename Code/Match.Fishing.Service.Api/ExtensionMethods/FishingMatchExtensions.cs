using System;
using System.Linq;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;

namespace Match.Fishing.ExtensionMethods
{
    public static class FishingMatchExtensions
    {
        public static void CalculateMatchPoints(this FishingMatch fishingMatch)
        {
            var matchEntriesBySection = fishingMatch.MatchEntries
                                              .OrderBy(matchEntry => matchEntry.Weight)
                                              .GroupBy(m => m.Section);
            
            var pointsMapping = DataFileService.GetDataFile<PositionToPointsMapping>(DataFileType.PositionToPointsMapping)
                                               .SingleOrDefault(mapping => mapping.Id == fishingMatch.PositionToPointsMappingId);

            if (pointsMapping == null)
            {
                throw new Exception("Position to points mapping not found");
            }

            foreach (var section in matchEntriesBySection)
            {
                var position = 0;
                foreach (var matchEntry in section.OrderByDescending(m => m.Weight))
                {
                    position += 1;
                    matchEntry.Position = position;
                    if (Math.Abs(matchEntry.Weight) <= 0)
                    {
                        matchEntry.Points = pointsMapping.DidNotWeighPoints;
                        continue;
                    }

                    var points = pointsMapping.PositionToPoints
                                              .SingleOrDefault(p => p.Position == matchEntry.Position)?.Points
                                 ?? pointsMapping.PositionToPoints.Last().Points;

                    matchEntry.Points = points;
                }
            }

            var winner = fishingMatch.MatchEntries
                                     .OrderByDescending(me => me.Weight)
                                     .FirstOrDefault();

            if (winner != null)
            {
                winner.Points += pointsMapping.WinnerAdditionalPoints;
            }
        }
    }
}