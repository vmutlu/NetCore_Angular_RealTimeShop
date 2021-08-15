using HappyCommunication.API.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HappyCommunication.API.Services
{
    public interface ICommunicationService
    {
        List<Communication> GetProduct(string connectionID);
        Task UpdateProduct(Communication communication);
        Communication GetByIdProduct(int productId);
    }
}
