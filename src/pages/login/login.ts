import { Component } from '@angular/core';
import { NavController, Loading, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth';

import { HomePage } from '../home/home';
import { ErrorChecker } from '../../util/ErrorChecker';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup
  private loading: Loading

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authProvider: AuthProvider,) {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email]) ],
        password: ['', Validators.required]
      })
  }

  login() {
    if(this.isFormValid()) {
      const email = this.loginForm.controls.email.value
      const password = this.loginForm.controls.password.value
      
      this.loading = this.createLoading('Realizando login...')
      this.loading.present()

      this.authProvider.signin(email, password)
      .then(data => this.navCtrl.setRoot(HomePage))
      .catch(error => this.showMessage(ErrorChecker.getErrorMessage(error)))
      .then(() => this.loading.dismiss())
    }
  }

  isFormValid() {
    let errors = []
    let controls = this.loginForm.controls

    Object.keys(controls).forEach(key => {
      if(controls[key].errors) {
        if(controls[key].errors.required) errors.push(`O campo ${key} é obrigatório`)
        if(controls[key].errors.email) errors.push(`O campo ${key} deve estar no formato nome@email.com`)
      }
    })

    if(errors.length > 0) this.showMessage(errors[0])

    const isValid = (errors.length > 0) ? false : true

    return isValid
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
