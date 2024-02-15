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
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
  
  export class ResidenciasDTO {
    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsString({ message: 'Formato de email inválido' })
    @MinLength(1, { message: 'Bloco não pode ser menor que $constraint1 caracteres' })
    @MaxLength(1, { message: 'Bloco não pode ultrapassar $constraint1 caracteres' })
    @ApiProperty({
      example: 'A',
      description: `Letra do Bloco para identificar a residência`,
    })
    readonly bloco: string;
  
    @IsNotEmpty({ message: 'Item não pode ser vazio' })
    @IsNumber(
      { allowInfinity: false, allowNaN: false }, 
      { message: 'Apartamento precisa ser um texto' },
    )
    @ApiProperty({
      example: 21,
      description: `Número do apartamento para identificar a residência`,
    })
    readonly apartamento: number;
  
    @IsNotEmpty({ message: 'Proprietario não pode ser vazio' })
    @IsString({ message: 'Proprietario deve ser preenchida corretamente' })
    @MinLength(3, { message: 'Proprietario não pode ser menor que $constraint1 caracteres' })
    @MaxLength(100, { message: 'Proprietario não pode ultrapassar $constraint1 caracteres' })
    @ApiProperty({
      example: 'José Souza',
      description: `O nome do proprietario da residência`,
    })
    readonly proprietario: string;

    @IsString({message: 'ID do morado deve ser um texto'})
    @Type(() => MoradoresDTO)
    @ValidateNested({each: true})
    @ApiPropertyOptional({
      examples: ['moradorID1', 'moradorID2'],
      description: `Os dados do morador serão utilizados para relacionar o morador com a residencia em questão`,
    })
    readonly moradores?: MoradoresDTO[]
  }
  
  export class updateResidenciaDTO extends PartialType(ResidenciasDTO) {}