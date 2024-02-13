import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
  } from 'class-validator';
import { MoradoresDTO } from './moradores.dto';
import { Type } from 'class-transformer';
  
  export class ResidenciasDTO {
    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsString({ message: 'Formato de email inválido' })
    @MinLength(1, {
      message: 'Bloco não pode ser menor que $constraint1 caracteres',
    })
    @MaxLength(1, {
      message: 'Bloco não pode ultrapassar $constraint1 caracteres',
    })
    readonly bloco: string;
  
    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsNumber(
      { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
      { message: 'Apartamento precisa ser um texto' },
    )
    readonly apartamento: number;
  
    @IsNotEmpty({ message: 'Proprietario não pode ser vazio' })
    @IsString({ message: 'Proprietario deve ser preenchida corretamente' })
    @MinLength(3, { message: 'Proprietario não pode ser menor que $constraint1 caracteres' })
    @MaxLength(100, { message: 'Proprietario não pode ultrapassar $constraint1 caracteres' })
    readonly proprietario: string;

    @Type(() => MoradoresDTO)
    @ValidateNested({each: true})
    readonly moradores?: MoradoresDTO[]
  }
  