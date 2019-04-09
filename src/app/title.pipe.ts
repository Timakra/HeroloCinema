import { Pipe, PipeTransform } from '@angular/core';
/*
 * Removes all none alphanumeric charcters and capitalize first letter of each word
*/
@Pipe({name: 'titlePipe'})
export class titlePipe implements PipeTransform {
  transform(value: string): string {
    if(!value){
        return value;
    }
    var letterNumber = /^[0-9a-zA-Z ]+$/;
    return value.toLowerCase()
    // splits the string into a list of charcters
    .split('')
    // filters all un alphanumric charcters
    .filter((char)=>{
        return letterNumber.test(char);
    })
    //joins string back togther
    .join('')
    // splits string into words
    .split(' ')
    // capitalizes first letter of each word
    .map(word=>{
        return word[0].toUpperCase() + word.substring(1)
    })
    // joins tha list back togther into a string
    .join(' ')
  }
}