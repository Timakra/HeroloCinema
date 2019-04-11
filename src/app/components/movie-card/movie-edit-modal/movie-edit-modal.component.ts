import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {DateValidator} from './../../../date.validator'
import { MoviesService } from 'src/app/services/movies.service';
import {Movie,ProductionCompanies,MovieAdditionalInfo} from './../../../models/movies.model'
@Component({
  selector: 'app-movie-edit-modal',
  templateUrl: './movie-edit-modal.component.html',
  styleUrls: ['./movie-edit-modal.component.scss']
})
export class MovieEditModalComponent implements OnInit {
  @ViewChild('picker') picker : MatDatepicker<any>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  movieForm : FormGroup;
  
  // data image for new posters
  newPoster : string | ArrayBuffer;
  production_companies: ProductionCompanies[];

  constructor(
    public dialogRef: MatDialogRef<MovieEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private fb : FormBuilder,
    private moviesService : MoviesService
  ) {}

  ngOnInit() {
    //Clones production company array
    this.production_companies = this.data.additionalData.production_companies.slice(0);
    // Sets validator for all fields
    this.movieForm = this.fb.group({
      title:[this.data.title, Validators.compose([
        Validators.minLength(1),
        //None empty string patter
        Validators.pattern(`(.*[^\\s]+.*)`),
        Validators.required
      ])],
      genre:[this.data.genres.join(' '), Validators.compose([
        Validators.minLength(1),
        //None empty string patter
        Validators.pattern(`(.*[^\\s]+.*)`),
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
      let title = this.movieForm.controls['title'].value;
      //checks if title already exist
      if(this.moviesService.checkTitle(title,this.data.id)){
        this.movieForm.controls['title'].setErrors({titleExist:true})
        return;
      }

      //picks data from the valid form
        //if new poster not added stays with old one and if this one doenst exist takes a default place holder
      this.data.posterUrl =  this.newPoster || this.data.posterUrl || 'assets/poster-placeholder.jpg';
      //Trims whitespace from title
      this.data.title = this.movieForm.controls['title'].value.trim();
      this.data.additionalData.production_companies = this.production_companies
      this.data.genres = this.movieForm.controls['genre'].value.split(' ');
      this.data.release_date = this.movieForm.controls['release_date'].value;
      this.data.overview = this.movieForm.controls['overview'].value;
      this.dialogRef.close(this.data);
    }
  }

  //Opens date picker
  openPicker(){
    this.picker.open();
  }

  //Closes dialog
  closeDialog(){
    this.dialogRef.close();
  }

  //removes a production company
  removeCompany(index){
    this.production_companies.splice(index,1);
  }
  
  
  //adds a production company
  addCompany(e){
    this.movieForm.controls['company'].updateValueAndValidity();
    if(this.movieForm.controls['company'].valid){
      this.production_companies.push({name:e.value});
      //resets input field
      this.movieForm.controls['company'].setValue('');;
    }
  }

  addPoster(e){
    let files = e.target.files
    // Checks filereader support and file exists
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = ()=>{
        //save image url to newPoster
        this.newPoster = fr.result;
      }
      fr.readAsDataURL(files[0]);
    }
  }

}
