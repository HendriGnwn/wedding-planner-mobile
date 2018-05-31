import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcedureAdministrationPage } from './procedure-administration';

@NgModule({
  declarations: [
    ProcedureAdministrationPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcedureAdministrationPage),
  ],
})
export class ProcedureAdministrationPageModule {}
