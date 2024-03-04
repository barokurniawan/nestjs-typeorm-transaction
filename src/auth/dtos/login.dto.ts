import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export default class LoginDto {

    @MinLength(4)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}