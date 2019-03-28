import {FormGroup} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(formGroup: FormGroup) {
       const password = formGroup.get('password').value; // to get value in input tag
       const confirmPassword = formGroup.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            formGroup.get('confirmPassword').setErrors( {mismatch: true} );
        } else {
            return null;
        }
    }
}
