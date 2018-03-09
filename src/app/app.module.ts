import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Deeplinks } from '@ionic-native/deeplinks';


import { ApiProvider } from '../providers/api/api';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { RegisterPage } from '../pages/register/register';
import { RegisterRelationPage } from '../pages/register-relation/register-relation';
import { WelcomePage } from '../pages/welcome/welcome';
import { ConceptPage } from '../pages/concept/concept';
import { CostPage } from '../pages/cost/cost';
import { NotificationPage } from '../pages/notification/notification';
import { ProcedurePage } from '../pages/procedure/procedure';
import { ContentPage } from '../pages/content/content';
import { ContentDetailPage } from '../pages/content-detail/content-detail';
import { ContentDetailListPage } from '../pages/content-detail-list/content-detail-list';
import { ProcedurePageModule } from '../pages/procedure/procedure.module';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingPage } from '../pages/setting/setting';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { RelationProfileDetailPage } from '../pages/relation-profile-detail/relation-profile-detail';
import { StaticPage } from '../pages/static/static';
import { VendorPage } from '../pages/vendor/vendor';
import { VendorDetailPage } from '../pages/vendor-detail/vendor-detail';
import { ReportProblemPage } from '../pages/report-problem/report-problem';
import { HelpersProvider } from '../providers/helpers/helpers';
import { DatePicker } from '@ionic-native/date-picker';

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
    TabsPage,
    ContentPage,
    ContentDetailPage,
    ContentDetailListPage,
    RegisterRelationPage,
    SettingPage,
    EditProfilePage,
    RelationProfileDetailPage,
    StaticPage,
    ReportProblemPage,
    VendorPage,
    VendorDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:true
    }),
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
    TabsPage,
    ContentPage,
    ContentDetailPage,
    RegisterRelationPage,
    SettingPage,
    EditProfilePage,
    RelationProfileDetailPage,
    StaticPage,
    ReportProblemPage,
    VendorPage,
    VendorDetailPage
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
    Camera,
    DatePicker,
    Deeplinks
  ]
})
export class AppModule {}
