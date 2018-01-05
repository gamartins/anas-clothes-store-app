import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ErrorChecker } from '../../util/ErrorChecker';

import { ClothesProvider } from '../../providers/clothes';

import * as moment from 'moment';

@Component({
  selector: 'page-clothes-details',
  templateUrl: 'clothes-details.html',
})
export class ClothesDetailsPage {  
  private clotheForm: FormGroup
  private clotheId: string

  private loading: Loading

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private clothesProvider: ClothesProvider) {
    
    this.clotheForm = this.formBuilder.group({
      description: [ '', Validators.required ],
      brand: [ '', Validators.required],
      purchase_price: [ '', Validators.required ],
      purchase_date: [ '', Validators.required ]
    })

  }

  ionViewWillEnter() {
    this.clotheId = this.navParams.get('id')
    
    if(this.clotheId)
      this.getClotheDate()
  }
  
  getClotheDate() {
    this.loading = this.createLoading('Obtendo informações...')
    this.loading.present()
  
    this.clothesProvider.getClothesById(this.clotheId)
    .then((data: any) => this.fillClotheForm(data.clothe))
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())

  }

  fillClotheForm(clothe) {
    this.clotheForm.controls.description.setValue(clothe.description)
    this.clotheForm.controls.brand.setValue(clothe.brand)
    this.clotheForm.controls.purchase_price.setValue(clothe.purchase_price)

    const date = moment.utc(clothe.purchase_date).format('YYYY-MM-DD')
    this.clotheForm.controls.purchase_date.setValue(date)
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
    const errors = ErrorChecker.getFormError(this.clotheForm.controls)
    
    if(errors.length == 0) {
      this.loading = this.createLoading('Salvando roupa...')
      this.loading.present()
      
      let clothe = this.formatData()
      let savePromise = null
      
      if(this.clotheId) savePromise = this.clothesProvider.editClothe(this.clotheId, clothe)
      else savePromise = this.clothesProvider.addCltohes(clothe)
      
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
    this.loading = this.createLoading('Removendo roupa...')
    this.loading.present()

    this.clothesProvider.removeClothe(this.clotheId)
    .then(() => this.navCtrl.pop())
    .catch(error => {
      this.showMessage(ErrorChecker.getErrorMessage(error))
      this.loading.dismiss()
    })
  }

  formatData() {
    const clothe = this.clotheForm.value
    const date = moment(clothe.purchase_date, "YYYY-MM-DD")
    const formatedDate = date.format('DD/MM/YYYY')
    clothe.purchase_date = formatedDate

    return clothe
  }

}
