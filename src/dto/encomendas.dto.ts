import { ResidenciasDTO } from "./residencias.dto";
import { MoradoresDTO } from "./moradores.dto";

export class EncomendasDTO{
    readonly destinatario: MoradoresDTO;
    readonly residencia: ResidenciasDTO;
    readonly codrastreio: string;
    readonly status: boolean;
    readonly recebedor: string;
    readonly dtchegada: Date;
    readonly dtretirada: Date;
}