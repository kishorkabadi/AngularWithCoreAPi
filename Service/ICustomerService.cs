using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TestApplication.Model;

namespace TestApplication.Service
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> Get();
        Task<Customer> Get(int id);
        Task<HttpResponseMessage> Post(Customer customer);
        Task<HttpResponseMessage> Put(int id,Customer customer);

        Task<HttpResponseMessage> Delete(int id);
    }
}
