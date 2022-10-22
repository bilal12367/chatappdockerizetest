import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";
class InvalidCredentialError extends CustomError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default InvalidCredentialError;