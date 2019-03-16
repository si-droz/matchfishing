using System;
using System.Collections.Generic;
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
            List<MatchEntry> sortedMatchEntries = fishingMatch.MatchEntries.OrderByDescending(matchEntry => matchEntry.Weight).ToList();

            PositionToPointsMapping positionToPointsMapping = DataFileService.GetDataFile<PositionToPointsMapping>(DataFileType.PositionToPointsMapping)
                                                                             .SingleOrDefault(mapping => mapping.Id == fishingMatch.PositionToPointsMappingId);

            if (positionToPointsMapping == null) throw new Exception("Position to points mapping not found");

            for (var index = 0; index < sortedMatchEntries.Count; index++)
            {
                sortedMatchEntries[index].Position = index + 1;

                if (Math.Abs(sortedMatchEntries[index].Weight) <= 0)
                {
                    sortedMatchEntries[index].Points = positionToPointsMapping.DidNotWeighPoints;
                    continue;
                }

                if (index > positionToPointsMapping.PositionToPoints.Count - 1)
                {
                    sortedMatchEntries[index].Points = positionToPointsMapping.PositionToPoints.Last().Points;
                    continue;
                }

                sortedMatchEntries[index].Points = positionToPointsMapping.PositionToPoints[index].Points;
            }
        }
    }
}