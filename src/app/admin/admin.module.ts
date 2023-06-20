import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AlertModule } from '@coreui/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,AlertModule,
    AdminRoutingModule, 
  ]
})
export class AdminModule { }
