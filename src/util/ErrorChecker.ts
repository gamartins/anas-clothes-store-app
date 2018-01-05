export class ErrorChecker {
    
    public static getFormError(controls) {
        let errors = []

        Object.keys(controls).forEach(key => {
            if(controls[key].errors)
                console.log(controls[key].errors)

            if(controls[key].errors && controls[key].errors.required)
                errors.push(`O campo ${key} é obrigatório`)
            
            if(controls[key].errors && controls[key].errors.minlength) {
                const requiredLength = controls[key].errors.minlength.requiredLength
                errors.push(`O campo ${key} deve possuir no mínimo ${requiredLength } caracteres`)
            }

            if(controls[key].errors && controls[key].errors.maxlength) {
                const requiredLength = controls[key].errors.maxlength.requiredLength
                errors.push(`O campo ${key} deve possuir no máximo ${requiredLength} caracteres`)
            }

            if(controls[key].errors && controls[key].errors.email) {
                errors.push(`O campo ${key} deve estar no formato nome@email.com`)
            }

            if(controls[key].errors && controls[key].errors.matchPassword) {
                errors.push(`O campos senha e confirmar senha devem ser iguais`)
            }

            if(controls[key].errors && controls[key].errors.matchEmail) {
                errors.push(`O campos email e confirmar email devem ser iguais`)
            }
        })

        return errors

    }

    static getErrorMessage(error) {
        console.log(error)
        
        let error_message = ''

        if (error.hasOwnProperty('_body')) {
            error_message = this.getBodyErrorMessage(JSON.parse(error['_body']))
        }
        
        else if (error.hasOwnProperty('status')) {
            error_message = this.getStatusCodeErrorMessage(error)
        }
        
        else {
            error_message = 'Ocorreu um erro inesperado'
        }

        return error_message
    }

    private static getStatusCodeErrorMessage(error) {
        let errorMessage = 'Não foi possível se conectar'
    
        if (error.status == '401') {
            errorMessage = 'Usuário não possui permissão para acessar o recurso'
        }

        if (error.status == '404') {
            errorMessage = 'Não foi possível encontrar o servidor'
        }
          
        if (error.status == '422') {
            errorMessage = 'Não foi possível prosseguir com a requisição'
        }
      
        if (error.status == '500') {
            errorMessage = 'Ocorreu um erro inesperado'
        }

        return errorMessage
    }

    private static getBodyErrorMessage(errorBody) {
        let error_message = 'Ocorreu um erro inesperado'
        
        if(errorBody.error) error_message = errorBody.error
        else if (errorBody[0] && errorBody[0].msg) error_message = errorBody[0].msg

        return error_message
    }
}