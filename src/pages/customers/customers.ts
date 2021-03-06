import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';

import { ErrorChecker } from '../../util/ErrorChecker';

import { CustomersProvider } from '../../providers/customers';

import { CustomersDetailsPage } from '../customers-details/customers-details';

@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  customers = []
  role = null

  loading: Loading

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public customerProvider: CustomersProvider) {

  }

  ionViewWillEnter() {
    this.role = this.navParams.get('role')
    
    this.loading = this.createLoading('Obtendo clientes...')
    this.loading.present()

    this.customerProvider.getCustomers()
    .then((data: any) => this.customers = data.customers)
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())

  }

  customerSelected(id?) {
    if(this.role == 'search') {
      this.navCtrl.getPrevious().data.customerID = id
      this.navCtrl.pop()
    }

    else
      this.navCtrl.push(CustomersDetailsPage, { id: id })
  }

  createLoading(message) {
    return this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    })
  }

  showMessage(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    }).present()
  }

}
