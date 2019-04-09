import {MatChipsModule,MatDatepickerModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule ,MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatChipsModule,MatDatepickerModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  exports: [MatChipsModule,MatDatepickerModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule],
})
export class MaterialComponentsModule { }