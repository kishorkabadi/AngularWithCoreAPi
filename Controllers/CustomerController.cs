using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestApplication.Model;
using TestApplication.Service;

namespace TestApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerService customerService;
        public CustomerController(ICustomerService _customerService)
        {
            customerService = _customerService;
        }
        // GET: api/Customer
        [HttpGet]
        public async Task<IEnumerable<Customer>> Get()
        {
            return await customerService.Get();
        }

        // GET: api/Customer/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<Customer> Get(int id)
        {
            return await customerService.Get(id);
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<HttpResponseMessage> Post(Customer customer)
        {
            return await customerService.Post(customer);
        }

        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public async Task<HttpResponseMessage> Put(int id, Customer customer)
        {
            return await customerService.Put(id, customer);
        }
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<HttpResponseMessage> Delete(int id)
        {
            return await customerService.Delete(id);
        }
    }
}
