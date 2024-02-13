import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EncomendasDTO } from './encomendas.dto';
import { ResidenciasDTO } from './residencias.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MoradoresDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'Nome precisa ser texto' })
  @MinLength(2, {
    message: 'Nome não pode ser menor que $constraint1 caracteres',
  })
  @MaxLength(100, {
    message: 'Nome não pode ultrapassar $constraint1 caracteres',
  })
  @ApiProperty({
    example: 'José Souza',
    description: `O nome será utilizado para registro e relação com as encomendas do morador`,
  })
  readonly name: string;

  @IsNotEmpty({ message: 'Residência não pode ser vazio' })
  @Type(() => ResidenciasDTO)
  @ValidateNested({each: true})
  @ApiProperty({
    example: {
      apartamento: '21',
      bloco: 'B',
      proprietario: 'Eduardo Souza'
    },
    description: `Os dados da residência serão utilizados para relacionar o morador com a residência em questão`,
  })
  readonly residencia: ResidenciasDTO;

  
  readonly encomendas?: EncomendasDTO[];
}
