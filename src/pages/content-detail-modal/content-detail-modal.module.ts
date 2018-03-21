import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentDetailModalPage } from './content-detail-modal';

@NgModule({
  declarations: [
    ContentDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentDetailModalPage),
  ],
})
export class ContentDetailModalPageModule {}
