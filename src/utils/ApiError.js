class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super();
        this.statusCode=statusCode;
        this.message=message;
        this.errors=errors;
        // this.stack=stack;
        this.success = false;
        this.data= null

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export {ApiError}