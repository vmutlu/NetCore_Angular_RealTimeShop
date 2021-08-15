using HappyCommunication.API.Entity;
using System.Threading.Tasks;

namespace HappyCommunication.API.Hubs.Abstract
{
    public interface IHubCommunicationDispatcher
    {
        Task ChangeProduct(Communication communication);
    }
}
