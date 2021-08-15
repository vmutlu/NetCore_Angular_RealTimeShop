using HappyCommunication.API.Entity;
using HappyCommunication.API.Hubs.Abstract;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace HappyCommunication.API.Hubs.Concrete
{
    public class HubCommunicationDispatcher : IHubCommunicationDispatcher
    {
        private readonly IHubContext<CommunicationHub> _hubContext;
        public HubCommunicationDispatcher(IHubContext<CommunicationHub> hubContext) =>
            _hubContext = hubContext;

        public async Task ChangeProduct(Communication communication) =>
            await _hubContext.Clients.All.SendAsync("ChangeProduct", communication).ConfigureAwait(false);
    }
}
