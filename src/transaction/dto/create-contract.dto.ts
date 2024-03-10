import { IsNotEmpty } from "class-validator";
import { CreateContactDetailDto } from "./create-contract-detail.dto";

export class CreateContactDto {

    @IsNotEmpty()
    orderId: string;

    detail: CreateContactDetailDto[];
}