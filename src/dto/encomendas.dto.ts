import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Schema } from "mongoose";
import { Transform, Type } from "class-transformer";

export class EncomendasDTO{

    @IsNotEmpty({ message: 'Morador não pode ser vazio' })
    @IsString({message: 'Destinatario não pode ser vazio'})
    @ApiProperty({
        example: 'moradorID',
        description: `Os dados do morador serão utilizados para relacionar o morador com a encomenda em questão`,
    })
    readonly destinatario: Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'Residência não pode ser vazio' })
    @IsString({message: 'Residencia não pode ser vazio'})
    @ApiProperty({
      example: 'residenciaID',
      description: `Os dados da residência serão utilizados para relacionar o morador com a encomenda em questão`,
    })
    readonly residencia: Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'Código de Rastreio não pode ser vazio' })
    @IsString({ message: 'Código de Rastreio deve ser preenchido somente com texto' })
    @MinLength(8, { message: 'Código de Rastreio não pode ser menor que $constraint1 caracteres' })
    @MaxLength(100, { message: 'Código de Rastreio não pode ultrapassar $constraint1 caracteres' })
    @ApiProperty({
        example: 'AA123456789BR',
        description: `O código de rastreio sera utilizado para salvar os dados da encomenda`,
    })
    readonly codrastreio: string;

    @IsNotEmpty({ message: 'Status não pode ser vazio' })
    @IsBoolean({message: 'Status deve ser um boolean true/false'})
    @ApiProperty({
        example: false,
        description: `O status da encomenda sera utilizado para verificar se a encomenda está entrega/a retirar`,
    })
    readonly status: boolean;
    
    @IsOptional()
    @IsString({message: 'Recebedor deve ser preenchido somente com texto'})
    @ApiPropertyOptional({
        examples: ['Eduardo da Silva', ''],
        description: `O recebedor da encomenda sera utilizado para salvar junto a encomenda`,
    })
    readonly recebedor?: string;

    @IsNotEmpty({message: 'Data de Chegada não pode ser vazia'})
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    @ApiProperty({
        example: '2024-02-14T15:07:30.510Z',
        description: `A data de chegada da encomenda sera utilizado para salvar o horário no qual ela chegou`,
    })
    readonly dtchegada: Date;

    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    @ApiPropertyOptional({
        examples: ['2024-02-14T15:08:07.788Z', null],
        description: `A data de retirada da encomenda sera utilizado para salvar o horário no qual ela foi retirada`,
    })
    readonly dtretirada?: Date;
}

export class updateEncomendaDTO extends PartialType(EncomendasDTO) {}