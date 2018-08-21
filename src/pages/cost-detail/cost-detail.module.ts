import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CostDetailPage } from './cost-detail';

@NgModule({
  declarations: [
    CostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CostDetailPage),
  ],
})
export class CostDetailPageModule {}
