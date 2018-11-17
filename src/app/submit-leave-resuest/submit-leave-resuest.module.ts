import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';



import { IonicModule } from '@ionic/angular';

import { SubmitLeaveResuestPage } from './submit-leave-resuest.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitLeaveResuestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubmitLeaveResuestPage]
})

export class SubmitLeaveResuestPageModule {}
