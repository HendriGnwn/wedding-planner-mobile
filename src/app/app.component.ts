import { Component, ViewChild } from '@angular/core';
import { Platform, Events, ToastController, Nav, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApiProvider} from '../providers/api/api';
import { Deeplinks } from '@ionic-native/deeplinks';
import { HelpersProvider } from '../providers/helpers/helpers';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild (Nav) nav: Nav;
  
  rootPage:any;
  isLoggedIn: any;
  loading: any;
  
  constructor(
    private platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private events: Events, 
    private apiProvider: ApiProvider, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public deeplinks: Deeplinks,
    public helpers: HelpersProvider,
    public alertCtrl: AlertController,
    public fcm: FCM
    ) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.show();
      splashScreen.hide();
//      setTimeout(function() {
//        splashScreen.hide();
//		console.log("splash screen hide");
//      }, 3000);
      
      this.isLoggedIn = localStorage.getItem("isLoggedIn");
      
      this.events.subscribe('auth:logout', (token: any) => {
        this.logout(token);
      });
      
      this.events.subscribe("auth:setLogin", (params: any) => {
        this.setLogin(params);
      })
      
      this.events.subscribe('auth:checkLogin', () => {
        this.checkLogin();
      });
      
      this.events.subscribe('auth:forceLogout', (message: string) => {
        this.forceLogout(message);
      });
      
      console.log(this.isLoggedIn);
      this.rootPage = "WelcomePage";
      
      this.pushSetup();
    });
  }
  
  pushSetup() {
    //Notifications
    this.fcm.subscribeToTopic('all');
    this.fcm.getToken().then(token=>{
     console.log(token);
    });
    this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
    });
    this.fcm.onTokenRefresh().subscribe(token=>{
        console.log(token);
      });

  }
  
  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.deeplinks.routeWithNavController(this.nav, {
        '/register-relation': "RegisterRelationPage",
        '/reset-password': "ResetPasswordPage"
      }).subscribe((match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
        }, (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
          if (this.isLoggedIn != "1") {
            this.rootPage = "TabsPage";
            this.nav.setRoot("TabsPage");
          } else {
            this.rootPage = "WelcomePage";
            this.nav.setRoot("WelcomePage");
          }
        });
    });
  }
  
  /**
   * Check login
   */
  checkLogin() {
    if (localStorage.getItem("isLoggedIn") != "1") {
      this.forceLogout("Session expired, Please Login again.");
    }
  }
  
  setLogin(params: any) {
    let result = params.user;
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("user", JSON.stringify(result.data));
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user_id", result.data.id);
  }
  
  /**
   * force logout
   */
  forceLogout(message: string) {
    this.helpers.toastPresent(message);
    this.helpers.clearLoggedIn();
    this.nav.setRoot("LoginPage", {}, {
      animate: true
    });
  }
  
  logout(token: any) {
    
    this.loading = this.loadingCtrl.create({
        content: "Please Wait ..."
      });
      this.loading.present();
    
    this.apiProvider.post('auth/logout', {}, {"Content-Type": "application/json", "Authorization": "Bearer " + token})
    .then ((data) => {
      
      this.helpers.clearLoggedIn();
      
      let result = JSON.parse(data.data);
      this.loading.dismiss();
      this.toastCtrl.create({
        message: result.message,
        duration: 3000,
        position: 'buttom',
        dismissOnPageChange: false,
      }).present();
       
      this.nav.setRoot("LoginPage", {}, {
        animate: true
      });
    })
    .catch((error) => {
      
      this.helpers.clearLoggedIn();
      
      this.loading.dismiss();
      
      this.toastCtrl.create({
         message: "Logout success",
         duration: 3000,
         position: 'buttom',
         dismissOnPageChange: false,
       }).present();
       
       this.nav.setRoot("LoginPage", {}, {
         animate: true
       });
    });
  }
}

