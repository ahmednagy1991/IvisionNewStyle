import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManualAdjustmentRequestPage } from './manual-adjustment-request.page';

const routes: Routes = [
  {
    path: '',
    component: ManualAdjustmentRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManualAdjustmentRequestPage]
})
export class ManualAdjustmentRequestPageModule {}
