import { IsAlphanumeric, IsNotEmpty, Length, MaxLength } from "class-validator";

export class CreateProductDTO {

    @MaxLength(12)
    @IsAlphanumeric()
    @IsNotEmpty()
    sku: string;

    @IsNotEmpty()
    productName: string;
}