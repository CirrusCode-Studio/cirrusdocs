import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthError } from 'src/common/errors/auth-error.enum';

export class AuthException extends HttpException {
  constructor(
    code: AuthError,
    message: string,
    status: HttpStatus,
    ) {
        super(
        {
            error: code,
            message,
            retryAfter: status === HttpStatus.TOO_MANY_REQUESTS ? 300 : undefined,
        },
        status,
        );
    }
}
