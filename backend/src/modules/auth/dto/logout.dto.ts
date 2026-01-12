import { IsString } from "class-validator"

class LogoutDto {
    @IsString()
    refreshToken: string
}

export { LogoutDto }