import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EncomendasDTO } from './encomendas.dto';
import { ResidenciasDTO } from './residencias.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MoradoresDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'Nome precisa ser texto' })
  @MinLength(3, { message: 'Nome não pode ser menor que $constraint1 caracteres' })
  @MaxLength(100, { message: 'Nome não pode ultrapassar $constraint1 caracteres' })
  @ApiProperty({
    example: 'José Souza',
    description: `O nome será utilizado para registro e relação com as encomendas do morador`,
  })
  readonly name: string;

  @IsOptional()
  @Type(() => ResidenciasDTO)
  @ValidateNested({each: true})
  @ApiProperty({
    example: 'residenciaID', 
    description: 'O id da residência será utilizado para criar a relação da residência com o morador'
  })
  readonly residencia?: ResidenciasDTO;

  @IsOptional()
  @Type(() => EncomendasDTO)
  @ValidateNested({each: true})
  @ApiPropertyOptional({
    examples: ['encomendaID1', 'encomendaID2'], 
    description: "Os id's das encomendas é utilizado para criar a relação das encomendas com o morador"
  })
  readonly encomendas?: EncomendasDTO[];
}
