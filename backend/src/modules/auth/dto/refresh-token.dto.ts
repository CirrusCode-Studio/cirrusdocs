import { IsString } from "class-validator";

class RefreshDto {
    @IsString()
    refreshToken: string;
}

export { RefreshDto }