import { IsDateString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsDateString()
    dob: string;

    lastName: string;
}
