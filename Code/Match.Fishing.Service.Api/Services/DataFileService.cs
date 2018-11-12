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
        private const string JsonPath = "~/App_Data/json/{0}.json";

        public static IEnumerable<TModel> GetDataFile<TModel>(DataFileType dataFileType)
        {
            string jsonFilePath = HostingEnvironment.MapPath(string.Format(JsonPath, dataFileType.ToString().ToLower()));

            if (string.IsNullOrWhiteSpace(jsonFilePath)) throw new ArgumentNullException();

            string jsonContent = File.ReadAllText(jsonFilePath);

            var models = JsonConvert.DeserializeObject<IEnumerable<TModel>>(jsonContent);

            return models;
        }

        public static void WriteDataFile<TModel>(DataFileType dataFileType, IEnumerable<TModel> model)
        {
            string jsonFilePath = HostingEnvironment.MapPath(string.Format(JsonPath, dataFileType.ToString().ToLower()));

            if (string.IsNullOrWhiteSpace(jsonFilePath)) throw new ArgumentNullException();

            string jsonDataToWrite = JsonConvert.SerializeObject(model, Formatting.Indented);

            File.WriteAllText(jsonFilePath, jsonDataToWrite);
        }
    }
}