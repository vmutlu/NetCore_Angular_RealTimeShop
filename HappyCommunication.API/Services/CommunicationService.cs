using HappyCommunication.API.Entity;
using HappyCommunication.API.Hubs.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyCommunication.API.Services
{
    public class CommunicationService : ICommunicationService
    {
        IHubCommunicationDispatcher _dispatcher;
        public CommunicationService(IHubCommunicationDispatcher dispatcher) =>
            _dispatcher = dispatcher;

        public static List<Communication> Communications = new();
        public static Dictionary<string, List<Communication>> CommunicationDB = new();
        private static readonly string[] CommunicationList = new[]
        {
            "alcatel", "apple", "casper", "matrix", "oppo", "samsung", "tecno", "trident", "vestel", "xiaomi"
        };

        public List<Communication> GetProduct(string connectionID)
        {
            var rn = new Random();
            Communications = Enumerable.Range(1, 10).Select(i => new Communication
            {
                Id = i,
                ProductName = CommunicationList[rn.Next(CommunicationList.Length)],
                Price = rn.Next(1000) + 500,
                CreatedDate = DateTime.Now
            }).GroupBy(item => item.ProductName).Select(group => group.First()).Take(3).ToList();
            Communications.ForEach(g => g.ImagePath = g.ProductName + ".jpg");

            CommunicationDB.Add(connectionID, Communications);
            return Communications;
        }

        public async Task UpdateProduct(Communication communication)
        {
            bool isChange = false;
            foreach (var productList in CommunicationDB)
            {
                var updated = productList.Value.Where(p => p.ProductName == communication.ProductName).FirstOrDefault();
                if (updated is not null)
                {
                    isChange = true;

                    productList.Value.Remove(updated);
                    productList.Value.Add(communication);
                    CommunicationDB[productList.Key] = productList.Value;
                }
            }

            if (isChange) await _dispatcher.ChangeProduct(communication).ConfigureAwait(false);
        }

        public Communication GetByIdProduct(int productId) => Communications.FirstOrDefault(i => i.Id == productId);
    }
}
