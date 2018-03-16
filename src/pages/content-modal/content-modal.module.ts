import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentModalPage } from './content-modal';

@NgModule({
  declarations: [
    ContentModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentModalPage),
  ],
})
export class ContentModalPageModule {}
