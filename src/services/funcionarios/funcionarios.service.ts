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
        } catch (err) {
            console.error(err)
            throw new BadRequestException(err.message || 'Erro ao buscar todos os funcionarios');
        }
    }

    async getFuncionarioById(funcionarioID: string): Promise<Funcionarios>{
        try {
            const user = await this.funcionariosRepository.getFuncionarioById(funcionarioID);
    
            if (!user) throw new BadRequestException('Usuario não encontrado');
    
            return user;
        } catch (error) {
            throw new BadRequestException('Erro na busca pelo usuario')
        }
    }

    async authFuncionario(funcionarioData: AuthFuncionariosDTO): Promise<{ access_token: string }>{
        try {
            const existFuncionario = await this.funcionariosRepository.authFuncionario(funcionarioData);
            if (!existFuncionario) throw new BadRequestException('Funcionario não existe');

            //CRIPTOGRAFAR E OCULTAR SENHA DO USUARIO
            const payload = {
                id: existFuncionario._id,
                name: existFuncionario.name, 
                email: existFuncionario.email, 
                perm: existFuncionario.permission
            }

            const token = await this.jwtService.signAsync(payload);

            if (!token) throw new UnauthorizedException('Falha ao gerar token');

            return {
                access_token: token
            };
        } catch (error) {
            throw new BadRequestException(error.message || 'Funcionario não existe')
        }
    }

    async createFuncionario(newFuncionario: FuncionariosDTO): Promise<Funcionarios>{
        try {

            const { name, email, password, permission } = newFuncionario;
            const hashPassword = await bcrypt.hash(password, 12);
            const payload = {
                name,
                email,
                password: hashPassword,
                permission
            }
            
            const createdFuncionario = await this.funcionariosRepository.createFuncionario(payload)

            if (!createdFuncionario) throw new BadRequestException('Erro ao criar um funcionario')

            return createdFuncionario;
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro ao criar um funcionario')
        }
    }
}
