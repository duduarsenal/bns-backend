import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthFuncionariosDTO {
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail(
    { host_whitelist: ['gmail.com', 'hotmai.com'] },
    { message: 'Formato de email inválido' })
  @ApiProperty({
    example: 'joao@gmail.com',
    description: 'O e-mail é utilizado para verificar se o funcionario existe e validar o mesmo junto a senha'
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @IsString({message: "A Senha deve ser enviada em texto"})
  @ApiProperty({
    example: 'joao123@',
    description: 'A senha é utilizada para verificar as credenciais do funcionario'
  })
  readonly password: string;
}
