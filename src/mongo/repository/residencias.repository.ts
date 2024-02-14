import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ResidenciasDTO } from 'src/dto/residencias.dto';
import { Residencias } from '../interfaces/residencias.interface';

@Injectable()
export class ResidenciasRepository {
  constructor(
    @InjectModel('residencias')
    private readonly residenciasModel: Model<Residencias>,
  ) {}

  async getAllResidencias(): Promise<Residencias[]> {
    return await this.residenciasModel.find().populate({
      path: 'moradores',
      select: '-residencia',
    });
  }

  async getResidenciaById(residenciaID: String): Promise<Residencias> {
    return await this.residenciasModel.findById({ _id: residenciaID });
  }

  async getResidenciaByFilter(
    residenciaData: ResidenciasDTO,
  ): Promise<Residencias> {
    return await this.residenciasModel
      .findOne({
        apartamento: residenciaData.apartamento,
        bloco: residenciaData.bloco,
        proprietario: residenciaData.proprietario,
      })
      .populate({
        path: 'moradores',
        select: '-_id -residencia',
      });
  }

  async addMoradorToResidencia(
    residencia: ResidenciasDTO,
    moradorID: mongoose.Schema.Types.ObjectId,
  ): Promise<void> {
    const res = await this.residenciasModel.findOne({
      apartamento: residencia.apartamento,
      bloco: residencia.bloco,
      proprietario: residencia.proprietario,
    });

    const listaMoradores = [...res.moradores];
    !listaMoradores.includes(moradorID) && listaMoradores.push(moradorID);

    await this.residenciasModel.findOneAndUpdate(
      {
        apartamento: residencia.apartamento,
        bloco: residencia.bloco,
        proprietario: residencia.proprietario,
      },
      { moradores: listaMoradores },
      { new: true },
    );
  }

  async deleteMoradorFromResidencia(
    residencia: ResidenciasDTO,
    moradorID: string,
  ): Promise<void> {
    const res = await this.residenciasModel.findOne({
      apartamento: residencia.apartamento,
      bloco: residencia.bloco,
      proprietario: residencia.proprietario,
    });

    const listaMoradores = await Promise.all(
      res.moradores.filter((morador) => morador.toString() != moradorID),
    );

    await this.residenciasModel.findOneAndUpdate(
      {
        apartamento: residencia.apartamento,
        bloco: residencia.bloco,
        proprietario: residencia.proprietario,
      },
      { moradores: listaMoradores },
    );
  }

  async createResidencia(newResidencia: ResidenciasDTO): Promise<Residencias> {
    return await this.residenciasModel.create(newResidencia);
  }

  async updateResidencia(residenciaID: String, residenciaData: Residencias): Promise<Residencias>{
    return await this.residenciasModel.findOneAndUpdate({_id: residenciaID}, {...residenciaData}, {new: true})
  }
}
