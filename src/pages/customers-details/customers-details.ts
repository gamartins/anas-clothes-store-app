import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomersProvider } from '../../providers/customers';
import { ErrorChecker } from '../../util/ErrorChecker';

@Component({
  selector: 'page-customers-details',
  templateUrl: 'customers-details.html',
})
export class CustomersDetailsPage {

  private customerForm: FormGroup
  private customerId: string

  private loading: Loading

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private customersProvider: CustomersProvider) {
    
    this.customerForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      phone: [ '', Validators.required],
      address: [ '', Validators.required ],
    })

  }

  ionViewWillEnter() {
    this.customerId = this.navParams.get('id')
    
    if(this.customerId)
      this.getCustomerData()
  }
  
  getCustomerData() {
    this.loading = this.createLoading('Obtendo informações...')
    this.loading.present()
  
    this.customersProvider.getCustomersById(this.customerId)
    .then((data: any) => this.fillCustomerForm(data.customer))
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())

  }

  fillCustomerForm(customer) {
    this.customerForm.controls.name.setValue(customer.name)
    this.customerForm.controls.phone.setValue(customer.phone)
    this.customerForm.controls.address.setValue(customer.address)
  }

  showMessage(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    }).present()
  }

  createLoading(message) {
    return this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    })
  }

  save(){
    const errors = ErrorChecker.getFormError(this.customerForm.controls)
    
    if(errors.length == 0) {
      this.loading = this.createLoading('Salvando clientes...')
      this.loading.present()
      
      let savePromise = null
      let customer = this.customerForm.value

      if(this.customerId) savePromise = this.customersProvider.editCustomer (this.customerId, customer)
      else savePromise = this.customersProvider.addCustomers(customer)
      
      savePromise.then(data => this.navCtrl.pop())
      .catch(error => {
        this.loading.dismiss()
        this.showMessage(ErrorChecker.getErrorMessage(error))
      })
    }

    else {
      this.showMessage(errors[0])
    }
  }

  remove() {
    this.loading = this.createLoading('Removendo clientes...')
    this.loading.present()

    this.customersProvider.removeCustomer(this.customerId)
    .then(() => this.navCtrl.pop())
    .catch(error => {
      this.showMessage(ErrorChecker.getErrorMessage(error))
      this.loading.dismiss()
    })
  }

}
