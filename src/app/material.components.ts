import {MatTooltipModule,MatChipsModule,MatDatepickerModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule ,MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatTooltipModule, MatChipsModule,MatDatepickerModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  exports: [MatTooltipModule, MatChipsModule,MatDatepickerModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule],
})
export class MaterialComponentsModule { }