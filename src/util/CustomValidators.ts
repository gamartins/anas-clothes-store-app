import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    public static matchPassword(abstractControl: AbstractControl) {
        const password = abstractControl.get('password').value
        const passwordConfirmation = abstractControl.get('passwordConfirmation').value
        
        if(password != passwordConfirmation)
            abstractControl.get('passwordConfirmation').setErrors({ matchPassword: true })
        else
            return null
    }

    public static matchEmail(abstractControl: AbstractControl) {
        const email = abstractControl.get('email').value
        const emailConfirmation = abstractControl.get('emailConfirmation').value
        
        if(email != emailConfirmation)
            abstractControl.get('emailConfirmation').setErrors({ matchEmail: true })
        else
            return null
    }
}