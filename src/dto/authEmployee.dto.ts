import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthEmployeeDTO {
  @IsEmail(
    {
      host_whitelist: [
        'gmail.com',
        'hotmai.com',
        'outlook.com',
        'yahoo.com',
        'live.com',
      ],
    },
    { message: 'Formato de email inválido' },
  )
  readonly email: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  readonly password: string;
}
