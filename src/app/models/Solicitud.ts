import { AbstractSolicitud } from './AbstractSolicitud';
import { Cliente } from './Cliente';

export class Solicitud implements AbstractSolicitud{
    mensaje: String;
    cliente: Cliente;    
}