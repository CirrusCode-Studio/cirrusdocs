import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthError } from '../errors/auth-error.enum';
import { prismaUniqueConstraintHasField } from '../prisma/prisma-error.util';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const res = host.switchToHttp().getResponse();

        if (exception.code === 'P2002') {
            if (prismaUniqueConstraintHasField(exception.meta, 'email')) {
                return res.status(HttpStatus.CONFLICT).json({
                    statusCode: HttpStatus.CONFLICT,
                    code: AuthError.EMAIL_ALREADY_EXISTS,
                    message: 'Email already registered',
                    field: 'email',
                    action: 'REDIRECT_LOGIN',
                });
            }

            return res.status(HttpStatus.CONFLICT).json({
                statusCode: HttpStatus.CONFLICT,
                code: 'UNIQUE_CONSTRAINT_FAILED',
                message: 'Unique constraint violation',
            });
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong',
        });
    }
}
