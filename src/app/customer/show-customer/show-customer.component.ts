import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-Customer',
  templateUrl: './show-Customer.component.html',
  styleUrls: ['./show-Customer.component.css']
})
export class ShowCustomerComponent implements OnInit {

  constructor(private service: ApiserviceService, private route: Router) { }

  CustomerList: any = [];
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }


  EditCustomer(item: any) {
    console.log(item)
    this.route.navigate(["/EditCustomer"], { queryParams: { id: item.id } });
  }

  deleteCustomer(item: any) {
    console.log(item)
    if (confirm('Are you sure??')) {
      this.service.deleteCustomer(item).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick() {
    this.refreshEmpList();
  }
  addCustomer() {
    this.route.navigate(["/EditCustomer"]);

  }

  refreshEmpList() {
    this.service.getCustomerList().subscribe(data => {
      console.log(data);
      this.CustomerList = data;
    });
  }
}
