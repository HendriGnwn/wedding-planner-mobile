import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentDetailListPage } from './content-detail-list';

@NgModule({
  declarations: [
    ContentDetailListPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentDetailListPage),
  ],
})
export class ContentDetailListPageModule {}
