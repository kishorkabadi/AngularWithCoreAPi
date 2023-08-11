using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestApplication.Model;

namespace TestApplication.Service
{
    public class CustomerService : ICustomerService
    {
        private readonly HttpClient _httpClient;

        public CustomerService(HttpClient client)
        {
            client.BaseAddress = new Uri("https://getinvoices.azurewebsites.net/api/");
            client.DefaultRequestHeaders.Add("Accept","application/json");
            _httpClient = client;
        }

        public async Task<HttpResponseMessage> Delete(int id)
        {
            using var httpResponse =
       await _httpClient.DeleteAsync($"/Customer/{id}");

            return httpResponse.EnsureSuccessStatusCode();
        }

        public async Task<IEnumerable<Customer>> Get()
        {
            using var httpResponse =
            await _httpClient.GetAsync($"/Customer");

            using var responseStream = await httpResponse.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync
               <IEnumerable<Customer>>(responseStream);
        }

        public async Task<Customer> Get(int id)
        {
            using var httpResponse =
            await _httpClient.GetAsync($"/Customer/{id}");

            using var responseStream = await httpResponse.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync
                <Customer>(responseStream);

        }

        public async Task<HttpResponseMessage> Post(Customer customer)
        {
            var customerItemJson = new StringContent(
         JsonSerializer.Serialize(customer),
         Encoding.UTF8,
         "application/json");

            using var httpResponse =
       await _httpClient.PostAsync("Customer", customerItemJson);

            return httpResponse.EnsureSuccessStatusCode();
        }
        public async Task<HttpResponseMessage> Put(int id,Customer customer)
        {
            var customerItemJson = new StringContent(
         JsonSerializer.Serialize(customer),
         Encoding.UTF8,
         "application/json");

            using var httpResponse =
       await _httpClient.PostAsync("Customer/id", customerItemJson);

            return httpResponse.EnsureSuccessStatusCode();
        }

    }
}
