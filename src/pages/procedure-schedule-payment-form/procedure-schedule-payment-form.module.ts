import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcedureSchedulePaymentFormPage } from './procedure-schedule-payment-form';

@NgModule({
  declarations: [
    ProcedureSchedulePaymentFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcedureSchedulePaymentFormPage),
  ],
})
export class ProcedureSchedulePaymentFormPageModule {}
