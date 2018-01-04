import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private authProvider: AuthProvider) {

  }

  logout() {
    this.loading = this.createLoading('Realizando logout...')
    this.loading.present()
    
    this.authProvider.signout()
      .then(() => this.navCtrl.setRoot(LoginPage))
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
