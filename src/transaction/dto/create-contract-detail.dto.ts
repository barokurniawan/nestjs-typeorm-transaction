import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateContactDetailDto {

    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}