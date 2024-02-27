import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthFuncionariosDTO } from 'src/dto/authFuncionarios.dto';
import { FuncionariosDTO } from 'src/dto/funcionarios.dto';
import { Funcionarios } from 'src/mongo/interfaces/funcionarios.interface';
import { FuncionariosRepository } from 'src/mongo/repository/funcionarios.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionariosService {

    constructor(
        private readonly funcionariosRepository: FuncionariosRepository,
        private jwtService: JwtService
    ){}

    async getFuncionarios(): Promise<Funcionarios[]>{
        try{
            const allFuncionarioss = await this.funcionariosRepository.getFuncionarios();
            return allFuncionarioss || [];
        } catch (error) {
            console.error(error)
            throw new BadRequestException(error.message || 'Erro ao buscar todos os funcionarios');
        }
    }

    async getFuncionarioById(funcionarioID: string): Promise<Funcionarios>{
        try {
            const user = await this.funcionariosRepository.getFuncionarioById(funcionarioID);
            if (!user) throw new BadRequestException('Usuario não encontrado');
    
            return user;
        } catch (error) {
            console.error(error)
            throw new BadRequestException(error.message || 'Erro na busca pelo usuario')
        }
    }

    async authFuncionario(funcionarioData: AuthFuncionariosDTO): Promise<{}>{
        try {
            const existFuncionario = await this.funcionariosRepository.authFuncionario(funcionarioData);
            if (!existFuncionario) throw new BadRequestException('Funcionario não encontrado');

            const payload = {
                id: existFuncionario._id,
                name: existFuncionario.name, 
                email: existFuncionario.email, 
                perm: existFuncionario.permission
            }

            const token = await this.jwtService.signAsync(payload);
            if (!token) throw new UnauthorizedException('Falha ao gerar token');

            return { user_name: existFuncionario.name, user_token: token }
        } catch (error) {
            console.error(error)
            throw new BadRequestException(error.message || 'Erro na autenticação do funcionario')
        }
    }

    async createFuncionario(newFuncionario: FuncionariosDTO): Promise<Funcionarios>{
        try {
            const existFuncionario = await this.funcionariosRepository.getFuncionarioByFilter(newFuncionario.email)
            if(existFuncionario) throw new BadRequestException('Funcionario já cadastrado no sistema');

            const hashPassword = await bcrypt.hash(newFuncionario.password, 12);
            const payload = {
                name: newFuncionario.name,
                email: newFuncionario.email,
                password: hashPassword,
                permission: newFuncionario.permission
            }
            
            const createdFuncionario = await this.funcionariosRepository.createFuncionario(payload)
            if (!createdFuncionario) throw new BadRequestException('Erro ao criar um funcionario')

            return createdFuncionario;
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao criar um funcionario')
        }
    }
}
