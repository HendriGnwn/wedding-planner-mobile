import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelationProfileDetailPage } from './relation-profile-detail';

@NgModule({
  declarations: [
    RelationProfileDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RelationProfileDetailPage),
  ],
})
export class RelationProfileDetailPageModule {}
