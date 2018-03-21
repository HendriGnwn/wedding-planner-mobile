import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentDetailNotePage } from './content-detail-note';

@NgModule({
  declarations: [
    ContentDetailNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ContentDetailNotePage),
  ],
})
export class ContentDetailNotePageModule {}
