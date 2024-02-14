import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Funcionarios } from "../interfaces/funcionarios.interface";
import { AuthFuncionariosDTO } from "src/dto/authFuncionarios.dto";
import { FuncionariosDTO } from "src/dto/funcionarios.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionariosRepository{

    constructor(
        @InjectModel('funcionarios') private readonly funcionariosModel: Model<Funcionarios>
    ){}

    async getFuncionarios(): Promise<Funcionarios[]>{
        return await this.funcionariosModel.find()
    }

    async getFuncionarioById(funcionariosID: string): Promise<Funcionarios>{
        return await this.funcionariosModel.findById({_id: funcionariosID}).select('-permission');
    }

    async authFuncionario(funcionarioData: AuthFuncionariosDTO): Promise<Funcionarios>{
        const user = await this.funcionariosModel.findOne({email: funcionarioData.email}).select('+password');
        if (!user) throw new BadRequestException('Usuario não existe');

        const matchPassword = await bcrypt.compare(funcionarioData.password, user.password);
        if (!matchPassword) throw new UnauthorizedException('Usuario ou senha incorretos');

        return await this.funcionariosModel.findOne({email: funcionarioData.email});
    }
    
    async createFuncionario(newFuncionario: FuncionariosDTO): Promise<Funcionarios>{
        const user = await this.funcionariosModel.findOne({email: newFuncionario.email});
        if (user) throw new BadRequestException('Usuario ja existe');

        return await this.funcionariosModel.create(newFuncionario);
    }
}