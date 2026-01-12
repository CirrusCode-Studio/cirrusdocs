import { HttpException, HttpStatus } from "@nestjs/common";
import { DocError } from "src/common/errors/doc-error.enum";

class DocException extends HttpException {
    constructor (
        code: DocError,
        message: string,
        status: HttpStatus
    ){
        super({
            error: code,
            message, 
            retryAfter: status === HttpStatus.TOO_MANY_REQUESTS ? 300 : undefined,
        }, 
        status );
    }
}

export { DocException }