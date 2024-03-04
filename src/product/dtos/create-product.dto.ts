import { IsAlphanumeric, IsNotEmpty, MaxLength } from "class-validator";

export class CreateProductDTO {

    @MaxLength(12)
    @IsAlphanumeric()
    @IsNotEmpty()
    sku: string;

    @IsNotEmpty()
    productName: string;
}