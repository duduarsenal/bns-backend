import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class FuncionariosDTO{

    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsString({ message: 'Formato de email inválido' })
    @MinLength(3, { message: 'Nome não pode ser menor que $constraint1 caracteres' })
    @MaxLength(100, { message: 'Nome não pode ultrapassar $constraint1 caracteres' })
    @ApiProperty({
        example: 'José Souza',
        description: `O nome será utilizado para registro e autenticação dos funcionarios`,
      })
    readonly name: string;

    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsString({message: 'Senha precisa ser um texto'})
    @IsEmail({host_whitelist: ['gmail.com', 'hotmai.com']}, {message: 'Email no formato inválido'})
    @ApiProperty({
        example: 'email@gmail.com',
        description: `O e-mail é necessário para o login e identificação do funcionario`,
    })
    readonly email: string;

    @IsString({message: 'Senha precisa ser um texto'})
    // @IsStrongPassword({minLength: 8}, {message: 'Senha não é forte suficiente, minimo 8 caracteres, 1 letra maiuscula, 1 numero e 1 caracter especial'})
    @ApiProperty({
        example: 'senhaforte123@',
        description: `A senha é necessaria para realizar a autenticação junto ao email do funcionario`,
    })
    readonly password: string;

    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsString({message: 'Permissão deve ser preenchida corretamente'})
    @ApiHideProperty()
    readonly permission: string;
}