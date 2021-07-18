import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ThirdPApiService } from '../../../services/ThirdPApiService';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connect-account',
  templateUrl: './connect-account.component.html',
  styleUrls: ['./connect-account.component.scss'],
})
export class ConnectAccountComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  countryData: any = [];
  stateData: any = [];
  cityData: any = [];

  isEdit: boolean;

  countryConfig = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    placeholder: 'Select Country *',
    customComparator: () => { },
    limitTo: 0,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
    clearOnSelection: false,
    inputDirection: 'ltr',
  }
  stateConfig = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    placeholder: 'Select State *',
    customComparator: () => { },
    limitTo: 0,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
    clearOnSelection: false,
    inputDirection: 'ltr',
  }
  cityConfig = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    placeholder: 'Select City *',
    customComparator: () => { },
    limitTo: 0,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
    clearOnSelection: false,
    inputDirection: 'ltr',
  }

  constructor(public apiService: ApiService,
    public thirpApiService: ThirdPApiService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private loader: NgxSpinnerService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const connect_id = "acct_1J8i8C2Zw2nwBsBW";
    this.loader.show();
    this.apiService
      .getConnectAccount(connect_id)
      .subscribe((res: any) => {
        this.isEdit = true;
        const response = res.connected_account;
        this.connectAccountForm.setValue({
          id_number: response.id_number || '*********',
          email: response.email,
          state: response.state,
          postal_code: response.postal_code,
          line1: response.line1,
          country: response.country,
          city: response.city,
          first_name: response.first_name,
          last_name: response.last_name,
          dob: response.dob,
          phone: response.phone
        });
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.loader.hide();
      });
    this.loadCountry();
  }
  userData = JSON.parse(localStorage.getItem("user_data"));
  connectAccountForm = new FormGroup({
    id_number: new FormControl('', Validators.required),
    email: new FormControl(this.userData.user.email, Validators.required),
    phone: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    postal_code: new FormControl('', Validators.required),
    line1: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    first_name: new FormControl(this.userData.user.first_name, Validators.required),
    last_name: new FormControl(this.userData.user.last_name, Validators.required),
    dob: new FormControl('', Validators.required),
  })

  loadCountry() {
    this.loader.show();
    this.thirpApiService
      .getCountries("id,iso2", "no_page")
      .subscribe((response: any) => {
        this.countryData = response;
        this.loader.hide();
      });
  }
  loadState(countryId) {
    this.loader.show();
    this.thirpApiService
      .getStates(countryId, "id,state_code", "no_page")
      .subscribe((response: any) => {
        this.stateData = response;
        this.loader.hide();
      });
  }
  loadCity(stateId) {
    this.loader.show();
    this.thirpApiService
      .getCities(stateId, "id", "no_page")
      .subscribe((response: any) => {
        this.cityData = response;
        this.loader.hide();
      });
  }
  //on changes events
  countryChanged(data: any) {
    if (data) {
      this.stateData = [];
      this.cityData = [];
      this.loadState(data.id);
    } else {
      this.stateData = [];
      this.cityData = [];
    }
  }
  stateChanged(data: any) {
    if (data) {
      this.cityData = [];
      this.loadCity(data.id);
    } else {
      this.cityData = [];
    }
  }
  cityChanged(data: any) {
  }

  saveBankDetails() {
    if (this.isEdit) {
      this.editConnectAccount();
    } else {
      this.addConnectAccount();
    }
  }

  addConnectAccount() {
    const data = { ...this.connectAccountForm.value, ...{ "city": this.connectAccountForm.value.city.name, "state": this.connectAccountForm.value.state.state_code, "country": this.connectAccountForm.value.country.iso2, phone: this.connectAccountForm.value.phone.number } };
    this.apiService
      .addConnectAccount(data)
      .subscribe((response: any) => {
        this.toastr.success('Connect account created successfully.');
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.toastr.error('Something went wrong.');
        this.loader.hide();
      });
  }

  editConnectAccount() {
    const updatedFormValues = {};
    const address = ['city', 'state', 'country', 'line1', 'postal_code'];
    this.connectAccountForm['_forEachChild']((control, name) => {
      if (control.dirty) {
        if (address.indexOf(name) > -1) {
          if(!updatedFormValues['address']) {
            updatedFormValues['address'] = {};
          }
          updatedFormValues['address'][name] = control.value;
        } else {
          updatedFormValues[name] = control.value;
        }

      }
    });
    const data = {
      "params": {
        ...updatedFormValues, ... {
          phone: this.connectAccountForm.value.phone.number,
          id_number: '',
          address: {
              "city": this.connectAccountForm.value.city.name,
              "state": this.connectAccountForm.value.state.state_code,
              "country": this.connectAccountForm.value.country.iso2,
              "line1": this.connectAccountForm.value.line1,
              "postal_code": this.connectAccountForm.value.postal_code,
          }
        },
      },
      "connect_id": "acct_1J8i8C2Zw2nwBsBW"
    }


    this.apiService
      .editConnectAccount(data)
      .subscribe((response: any) => {
        this.toastr.success('Connect account updated successfully.');
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.toastr.error('Something went wrong.');
        this.loader.hide();
      });
  }

}

