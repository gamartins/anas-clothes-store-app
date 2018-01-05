import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

import { UserInfoProvider } from '../providers/user-info';
import { AuthProvider } from '../providers/auth';
import { ClothesProvider } from '../providers/clothes';
import { CustomersProvider } from '../providers/customers';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClothesPage } from '../pages/clothes/clothes'
import { ClothesDetailsPage } from '../pages/clothes-details/clothes-details';
import { CustomersPage } from '../pages/customers/customers';
import { CustomersDetailsPage } from '../pages/customers-details/customers-details'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ClothesPage,
    ClothesDetailsPage,
    CustomersPage,
    CustomersDetailsPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ClothesPage,
    ClothesDetailsPage,
    CustomersPage,
    CustomersDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    UserInfoProvider,
    ClothesProvider,
    CustomersProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
