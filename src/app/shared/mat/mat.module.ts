import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';




const modules: any=[MatButtonModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[modules]
})
export class MatModule { }
