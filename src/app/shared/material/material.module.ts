import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

const matDependencies = [
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [],
  imports: [
    ...matDependencies
  ],
  exports: [
    ...matDependencies
  ]
})
export class MaterialModule { }
