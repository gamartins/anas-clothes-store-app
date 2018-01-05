import { Component } from '@angular/core';
import { NavController, NavParams, Loading, ToastController, LoadingController } from 'ionic-angular';
import { SalesProvider } from '../../providers/sales';
import { ErrorChecker } from '../../util/ErrorChecker';
import { SalesDetailsPage } from '../sales-details/sales-details';

import * as moment from 'moment';

@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {

  sales = []

  loading: Loading

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public salesProvider: SalesProvider) {

  }

  ionViewWillEnter() {
    this.loading = this.createLoading('Obtendo clientes...')
    this.loading.present()

    this.salesProvider.getSales()
    .then((data: any) => this.formatSaleData(data.sales))
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())

  }

  openSalesDetailsPage(id?) {
    this.navCtrl.push(SalesDetailsPage, { id: id })
  }

  formatSaleData(sales) {
    sales.forEach(sales => sales.date = moment.utc(sales.date).format('DD-MM-YYYY'))
    this.sales = sales
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
