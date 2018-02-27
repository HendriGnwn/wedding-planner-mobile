import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConceptPage } from './concept';

@NgModule({
  declarations: [
    ConceptPage,
  ],
  imports: [
    IonicPageModule.forChild(ConceptPage),
  ],
})
export class ConceptPageModule {}
