import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Events } from 'ionic-angular/util/events';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClothesPage } from '../pages/clothes/clothes';
import { CustomersPage } from '../pages/customers/customers';
import { SalesPage } from '../pages/sales/sales';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  pages = [
    { title: 'Home', component: HomePage },
    { title: 'Roupas', component: ClothesPage },
    { title: 'Clientes', component: CustomersPage },
    { title: 'Vendas', component: SalesPage },
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      events.subscribe('user:loaded', () => this.nav.setRoot(HomePage))
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component)
  }
}

