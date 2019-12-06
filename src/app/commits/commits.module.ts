import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitsRoutingModule } from './commits-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommitsComponent } from './commits/commits.component';

@NgModule({
  declarations: [CommitsComponent],
  imports: [
    CommonModule,
    CommitsRoutingModule,
    SharedModule
  ]
})
export class CommitsModule { }
