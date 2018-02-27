import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CostPage } from './cost';

@NgModule({
  declarations: [
    CostPage,
  ],
  imports: [
    IonicPageModule.forChild(CostPage),
  ],
})
export class CostPageModule {}
