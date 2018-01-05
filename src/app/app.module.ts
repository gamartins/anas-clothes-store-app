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

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClothesPage } from '../pages/clothes/clothes'
import { ClothesDetailsPage } from '../pages/clothes-details/clothes-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ClothesPage,
    ClothesDetailsPage,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    UserInfoProvider,
    ClothesProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
  ]
})
export class AppModule {}
