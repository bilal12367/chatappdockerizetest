import {StatusCodes} from 'http-status-codes';
const ErrorHandler = (error,req,res,next) =>{
    
    if(error.name === "ValidationError"){
        var missingFields = []
        var val = {}
        var fields = []
        var messages = []
        Object.values(error.errors).map((item)=>{
            fields.push(item.path);
            if(item.path=='password' && item.kind=='minlength'){
                messages.push('Password Should be atleast 6 characters');
            }else if(item.kind=='maxlength'){
                messages.push('Password Should be max 20 characters');
            }else{
                messages.push(item.message);
            }
        })
        res.status(StatusCodes.BAD_REQUEST).json({
            msg:'validation_error',
            fields,
            messages
        })
    }else if(error.code===11000){
        res.status(StatusCodes.UNAUTHORIZED).json({
            msg:"email_exist",
        })
    }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: error.message
        });
    }
   
}

export default ErrorHandler