import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';


import { ApiProvider } from '../providers/api/api';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage } from '../pages/welcome/welcome';
import { ConceptPage } from '../pages/concept/concept';
import { CostPage } from '../pages/cost/cost';
import { NotificationPage } from '../pages/notification/notification';
import { ProcedurePage } from '../pages/procedure/procedure';
import { ProcedurePageModule } from '../pages/procedure/procedure.module';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { HelpersProvider } from '../providers/helpers/helpers';

@NgModule({
  declarations: [
    MyApp,
	  LoginPage,
	  RegisterPage,
	  ForgotPasswordPage,
    WelcomePage,
    ConceptPage,
    CostPage,
    NotificationPage,
    //ProcedurePage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ProcedurePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	  LoginPage,
    RegisterPage,
	  ForgotPasswordPage,
    WelcomePage,
    ConceptPage,
    CostPage,
    NotificationPage,
    ProcedurePage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
	  HTTP,
    Device,
    HelpersProvider,
    File,
    Camera
  ]
})
export class AppModule {}
