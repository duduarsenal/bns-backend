import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class EmployeeDTO{

    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsString({ message: 'Formato de email inválido' })
    @MinLength(2, { message: 'Nome não pode ser menor que $constraint1 caracteres' })
    @MaxLength(100, { message: 'Nome não pode ultrapassar $constraint1 caracteres' })
    readonly name: string;

    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsEmail({host_whitelist: ['gmail.com', 'hotmai.com', 'outlook.com', 'yahoo.com', 'live.com']}, {message: 'Email no formato inválido'})
    readonly email: string;

    @IsStrongPassword({minLength: 8}, {message: 'Senha não é forte suficiente, minimo 8 caracteres, 1 letra maiuscula, 1 numero e 1 caracter especial'})
    readonly password: string;

    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsString({message: 'Permissão deve ser preenchida corretamente'})
    readonly permission: string;
}