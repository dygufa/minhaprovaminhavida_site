interface ValidationResult {
    [key: string]: boolean;
}

export class ValidationService {

    static requiredForNewCourseValidor(control): ValidationResult {
        if (typeof control.root.controls !== "undefined" &&
            control.root.controls.courseId.value == 0 &&
            control.value.trim() == '') {
                
            return {
                'required': true
            }            
        }
       
        return null;
    }

    static fileValidator(control): ValidationResult {
        if (control.value.length != 1) {
            return {
                'invalidNumberOfFiles': true
            }
        } 

        for (let file of control.value) {
            if (file.type != 'application/pdf') {
                return {
                    'invalidExtension': true
                }
            }
        }

        return null;
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return {
                'invalidEmailAddress': true
            };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return {
                'invalidPassword': true
            };
        }
    }
}