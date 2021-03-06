import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';

import { ClothesProvider } from '../../providers/clothes';

import { ClothesDetailsPage } from '../clothes-details/clothes-details'
import { ErrorChecker } from '../../util/ErrorChecker';

@Component({
  selector: 'page-clothes',
  templateUrl: 'clothes.html',
})
export class ClothesPage {
  clothes = []
  role = null

  loading: Loading

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public clotheProvider: ClothesProvider) {

  }

  ionViewWillEnter() {
    this.role = this.navParams.get('role')

    this.loading = this.createLoading('Obtendo roupas...')
    this.loading.present()

    this.clotheProvider.getClothes()
    .then((data: any) => this.clothes = data.clothes)
    .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
    .then(() => this.loading.dismiss())

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

  selectClothe(id?) {
    if(this.role == 'search') {
      this.navCtrl.getPrevious().data.clotheID = id
      this.navCtrl.pop()
    }
    
    else {
      this.navCtrl.push(ClothesDetailsPage, { id: id })
    }
  }

}
