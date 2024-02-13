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

export class MoradoresDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'Nome precisa ser texto' })
  @MinLength(2, {
    message: 'Nome não pode ser menor que $constraint1 caracteres',
  })
  @MaxLength(100, {
    message: 'Nome não pode ultrapassar $constraint1 caracteres',
  })
  readonly name: string;

  @IsNotEmpty({ message: 'Residência não pode ser vazio' })
  @Type(() => ResidenciasDTO)
  @ValidateNested({each: true})
  readonly residencia: ResidenciasDTO;

  readonly encomendas?: EncomendasDTO[];
}
