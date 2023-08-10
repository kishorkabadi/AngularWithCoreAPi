import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerModule } from '../customer.model';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms'
import { CountryModel } from 'src/app/Country.model';
import { LanguageModel } from '../Language.model';
import { gender } from '../gender.model';

@Component({
  selector: 'app-add-edit-Customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit, AfterViewInit {

  formDetails: FormGroup;
  countryList: CountryModel[] = [{ countryName: "India", countryCode: "IN" }, { countryName: "United State", countryCode: "US" }];
  languageList: LanguageModel[] = [{ Name: "English", Code: "en" }];
  currencyList: any = ["USD", "INR"];
  salutationList: any = [{ key: "Mr.", value: "Mr." }, { key: "Ms.", value: "Ms." }, { key: "Miss", value: "Miss" }];
  constructor(private service: ApiserviceService, private route: ActivatedRoute, private frmBuilder: FormBuilder) {
    this.formDetails = frmBuilder.group({
      id: [''],
      salutation: ['', Validators.required],
      initials: ['', Validators.required],
      firstname: ['', Validators.required],
      gender: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country_name: ['', Validators.required],
      primary_language: ['', Validators.required],
      balance: 0,
      phone_Number: ['', Validators.required],
      currency: ['', Validators.required]

    });
  }

  emp!: CustomerModule;
  CustomerId = "";
  genderList: gender[] = [{ name: "Male", value: "m" }, { name: "Female", value: "f" }];


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.CustomerId = params['id'];
    });
  }
  ngAfterViewInit() {
    if (this.CustomerId != "" && this.CustomerId != "0") {
      this.service.getCustomer(this.CustomerId).subscribe(res => {
        this.formDetails.patchValue({
          salutation: res.salutation,
          initials: res.initials,
          firstname: res.firstname,
          gender: res.gender,
          lastname: res.lastname,
          email: res.email,
          country_name: res.country_code,
          primary_language: res.primary_language_code,
          balance: res.balance,
          phone_Number: res.phone_Number,
          currency: res.currency,
        });
      });
    }
  }
  submitFormData(regForm: any) {
    console.log(regForm);

    if (this.CustomerId != "" && this.CustomerId != "0") {
      var val = {
        salutation: regForm.get('salutation').value,
        initials: regForm.get('initials').value,
        firstname: regForm.get('firstname').value,
        gender: regForm.get('gender').value,
        lastname: regForm.get('lastname').value,
        email: regForm.get('email').value,
        country_name: regForm.get('country_name').value,
        primary_language: regForm.get('primary_language').value,
        balance: regForm.get('balance').value,
        phone_Number: regForm.get('phone_Number').value,
        currency: regForm.get('currency').value

      };

      this.service.addCustomer(val).subscribe(res => {
        alert(res.toString());
      });

    }
    else {
      var val1 = {
        CustomerId: this.CustomerId,
        salutation: regForm.get('salutation').value,
        initials: regForm.get('initials').value,
        firstname: regForm.get('firstname').value,
        gender: regForm.get('gender').value,
        lastname: regForm.get('lastname').value,
        email: regForm.get('email').value,
        country_name: regForm.get('country_code').value,
        primary_language: regForm.get('primary_language_code').value,
        balance: regForm.get('balance').value,
        phone_Number: regForm.get('phone_Number').value,
        currency: regForm.get('currency').value
      };

      this.service.updateCustomer(val1).subscribe(res => {
        alert(res.toString());
      });
    }
  }

  deleteCustomer(id: any) {
    this.service.deleteCustomer(id).subscribe(res => {
      alert(res.toString());
    });

  }

  ResetForm() {
    this.CustomerId="";
    this.formDetails.reset();
  }

}
