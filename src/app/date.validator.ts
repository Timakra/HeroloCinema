import { FormControl } from '@angular/forms';

export class DateValidator {

    static Date(control: FormControl): { [key: string]: any } {
        let date = new Date(control.value);
        let dateString = `${date.getUTCMonth()+1}/${date.getDate()}/${date.getFullYear()}`
        let ptDatePattern =  /^((0|1|)\d{1})\/((0|1|2|)\d{1})\/((19|20)\d{2})/g;
        if (!ptDatePattern.test(dateString))
            return { "Date": true };

        return null;
    }
}