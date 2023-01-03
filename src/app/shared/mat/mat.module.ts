import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';


const modules: any=[MatButtonModule,MatCardModule,MatDialogModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[modules]
})
export class MatModule { }
