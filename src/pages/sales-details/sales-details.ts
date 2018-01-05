import { Component } from '@angular/core';
import { NavController, NavParams, Loading, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalesProvider } from '../../providers/sales';
import { ErrorChecker } from '../../util/ErrorChecker';

import { ClothesPage } from '../clothes/clothes';

import * as moment from 'moment';
import { ClothesProvider } from '../../providers/clothes';
import { CustomersProvider } from '../../providers/customers';
import { CustomersPage } from '../customers/customers';

@Component({
  selector: 'page-sales-details',
  templateUrl: 'sales-details.html',
})
export class SalesDetailsPage {

  private saleForm: FormGroup
  private saleID: string
  private clotheID: string
  private customerID: string

  private clothe = { id: '', description: 'Descrição da roupa', brand: 'Marca da roupa' }
  private customer = { id: '', name: 'Nome do Cliente', phone: 'Telefone'}

  private loading: Loading

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private salesProvider: SalesProvider,
    private clotheProvider: ClothesProvider,
    private customerProvider: CustomersProvider) {
    
    this.saleForm = this.formBuilder.group({
      date: [ '', Validators.required ],
      value: [ '', Validators.required],
      paid: [ false, ],
      clothe_id: [ '', Validators.required ],
      customer_id: [ '', Validators.required ],
    })

  }

  ionViewWillEnter() {
    this.saleID = this.navParams.get('id')
    this.clotheID = this.navParams.get('clotheID')
    this.customerID = this.navParams.get('customerID')

    if(this.clotheID) this.getClotheData()
    if(this.customerID) this.getCustomerData()

    if(this.saleID) this.getSaleData()
  }

  getCustomerData() {
    this.loading = this.createLoading('Obtendo informações...')
    this.loading.present()
  
    this.customerProvider.getCustomersById(this.customerID)
    .then((data: any) => {
      this.customer = data.customer
      this.saleForm.controls.customer_id.setValue(this.customer.id)
    })
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())
  }

  getClotheData() {
    this.loading = this.createLoading('Obtendo informações...')
    this.loading.present()
  
    this.clotheProvider.getClothesById(this.clotheID)
    .then((data: any) => {
      this.clothe = data.clothe
      this.saleForm.controls.clothe_id.setValue(this.clothe.id)
    })
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())
  }
  
  getSaleData() {
    this.loading = this.createLoading('Obtendo informações...')
    this.loading.present()
  
    this.salesProvider.getSalesById(this.saleID)
    .then((data: any) => {
      this.fillSaleForm(data.sale)
      this.clothe = data.sale.Clothe
      this.customer = data.sale.Customer
    })
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())
  }

  fillSaleForm(sale) {
    this.saleForm.controls.clothe_id.setValue(sale.clothe_id)
    this.saleForm.controls.customer_id.setValue(sale.customer_id)
    this.saleForm.controls.value.setValue(sale.value)
    this.saleForm.controls.paid.setValue(sale.paid)

    const date = moment.utc(sale.date).format('YYYY-MM-DD')
    this.saleForm.controls.date.setValue(date)
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

  searchClothe() {
    this.navCtrl.push(ClothesPage, { role: 'search' })
  }

  searchCustomer() {
    this.navCtrl.push(CustomersPage, { role: 'search' })
  }

  save(){
    const errors = ErrorChecker.getFormError(this.saleForm.controls)
    
    if(errors.length == 0) {
      this.loading = this.createLoading('Salvando clientes...')
      this.loading.present()
      
      let savePromise = null
      let sale = this.formatData()

      if(this.saleID) savePromise = this.salesProvider.editSales(this.saleID, sale)
      else savePromise = this.salesProvider.addSales(sale)
      
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

  formatData() {
    const sale = this.saleForm.value
    const date = moment(sale.date, "YYYY-MM-DD")
    const formatedDate = date.format('DD/MM/YYYY')
    sale.date = formatedDate

    return sale
  }

  remove() {
    this.loading = this.createLoading('Removendo clientes...')
    this.loading.present()

    this.salesProvider.removeSales(this.saleID)
    .then(() => this.navCtrl.pop())
    .catch(error => {
      this.showMessage(ErrorChecker.getErrorMessage(error))
      this.loading.dismiss()
    })
  }

}
