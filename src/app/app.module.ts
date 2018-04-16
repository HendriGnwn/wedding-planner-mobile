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
import { CallNumber } from '@ionic-native/call-number';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ApiProvider } from '../providers/api/api';
import { MyApp } from './app.component';
import { HelpersProvider } from '../providers/helpers/helpers';
import { DatePicker } from '@ionic-native/date-picker';
import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
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
    Deeplinks,
    CallNumber,
    PhotoViewer,
    InAppBrowser,
    Base64
  ]
})
export class AppModule {}
