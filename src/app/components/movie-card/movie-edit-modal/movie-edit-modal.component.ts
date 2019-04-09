import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {DateValidator} from './../../../date.validator'

@Component({
  selector: 'app-movie-edit-modal',
  templateUrl: './movie-edit-modal.component.html',
  styleUrls: ['./movie-edit-modal.component.scss']
})
export class MovieEditModalComponent implements OnInit {
  @ViewChild('picker') picker : MatDatepicker<any>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  movieForm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<MovieEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb : FormBuilder,
  ) {}

  ngOnInit() {
    // Sets validator for all fields
    this.movieForm = this.fb.group({
      title:[this.data.title, Validators.compose([
        Validators.minLength(1),
        //pattern to check that every charcter is alphanumeric or space and not just space
        Validators.pattern('[ ][a-zA-Z0-9][a-zA-Z0-9 ]{0,}|[a-zA-Z0-9][a-zA-Z0-9 ]{0,}'),
        Validators.required
      ])],
      genre:[this.data.genres.join(' '), Validators.compose([
        Validators.minLength(1),
        //pattern to check that every charcter is alphanumeric or space and not just space
        Validators.pattern('[ ][a-zA-Z0-9][a-zA-Z0-9 ]{0,}|[a-zA-Z0-9][a-zA-Z0-9 ]{0,}'),
        Validators.required
      ])],
      overview:[this.data.overview, Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])],
      company:['', Validators.compose([
        //pattern to check that every charcter is alphanumeric or space and not just space
        Validators.pattern('[a-zA-Z0-9]{1,}[a-zA-Z0-9 ]{0,}|[a-zA-Z0-9][a-zA-Z0-9 ]{0,}'),
        Validators.minLength(1),
      ])],
      release_date:[this.data.release_date, Validators.compose([
        Validators.required,
        DateValidator.Date
      ])],
      
    })
  }
  //Saves movie 
  save(){
    if(this.movieForm.valid){
      //picks data from the valid form
      this.data.title = this.movieForm.controls['title'].value
      this.data.genres = this.movieForm.controls['genre'].value.split(' ')
      this.data.release_date = this.movieForm.controls['release_date'].value
      this.data.overview = this.movieForm.controls['overview'].value
      this.dialogRef.close(this.data);
    }
  }

  //Opens date picker
  openPicker(){
    this.picker.open()
  }

  //Closes dialog
  closeDialog(){
    this.dialogRef.close();
  }

  //removes a production company
  removeCompany(index){
    this.data.additionalData.production_companies.splice(index,1);
  }
  
  
  //adds a production company
  addCompany(e){
    this.movieForm.controls['company'].updateValueAndValidity();
    if(this.movieForm.controls['company'].valid){
      this.data.additionalData.production_companies.push({name:e.value});
      //resets input field
      this.movieForm.controls['company'].setValue('')
    }
  }

}