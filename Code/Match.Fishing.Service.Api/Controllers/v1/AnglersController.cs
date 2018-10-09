using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Match.Fishing.Enums;
using Match.Fishing.Models;
using Match.Fishing.Services;

namespace Match.Fishing.Controllers.v1
{
    public class AnglersController : ApiController
    {
        [Route("api/v1/anglers")]
        public IEnumerable<Angler> Get()
        {
            return DataFileService.GetDataFile<Angler>(DataFileType.Anglers);
        }

        [Route("api/v1/anglers/{id}")]
        public Angler Get([FromUri]int id)
        {
            List<Angler> anglers = Get().ToList();
            Angler anglerToReturn = anglers.SingleOrDefault(angler => angler.Id == id);
            return anglerToReturn;
        }
    }
}
