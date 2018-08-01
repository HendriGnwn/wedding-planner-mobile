import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterTermPage } from './register-term';

@NgModule({
  declarations: [
    RegisterTermPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterTermPage),
  ],
})
export class RegisterTermPageModule {}
