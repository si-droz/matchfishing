using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;
using Match.Fishing.Enums;
using Newtonsoft.Json;

namespace Match.Fishing.Services
{
    internal static class DataFileService
    {
        public static IEnumerable<TModel> GetDataFile<TModel>(DataFileType dataFileType)
        {
            string jsonFilePath = HostingEnvironment.MapPath($"~/App_Data/json/{dataFileType.ToString().ToLower()}.json");

            if (string.IsNullOrWhiteSpace(jsonFilePath)) throw new ArgumentNullException();

            string jsonContent = File.ReadAllText(jsonFilePath);

            var models = JsonConvert.DeserializeObject<IEnumerable<TModel>>(jsonContent);

            return models;
        }
    }
}