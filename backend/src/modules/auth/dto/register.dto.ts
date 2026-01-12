import { IsEmail, MinLength } from "class-validator"

class RegisterDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
}

export { RegisterDto }
// note: check de biet password strong 