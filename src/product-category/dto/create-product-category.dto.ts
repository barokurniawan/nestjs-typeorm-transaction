import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateProductCategoryDto {

    @IsNotEmpty()
    @MaxLength(112)
    categoryName: string;

}
