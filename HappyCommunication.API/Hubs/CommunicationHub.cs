using HappyCommunication.API.Entity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace HappyCommunication.API.Hubs
{
    public class CommunicationHub : Hub
    {
        public override async Task OnConnectedAsync() =>
            await Clients.Caller.SendAsync("GetConnectionId", this.Context.ConnectionId).ConfigureAwait(false);

        public override async Task OnDisconnectedAsync(Exception exception)=>
            await base.OnDisconnectedAsync(exception).ConfigureAwait(false);

        public async Task ClearProduct(Communication communication) =>
            await Clients.All.SendAsync("ChangeProduct", communication).ConfigureAwait(false);
    }
}
