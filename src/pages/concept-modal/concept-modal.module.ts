import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConceptModalPage } from './concept-modal';

@NgModule({
  declarations: [
    ConceptModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ConceptModalPage),
  ],
})
export class ConceptModalPageModule {}
