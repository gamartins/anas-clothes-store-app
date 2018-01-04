export class ErrorChecker {
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

        return error_message
    }
}