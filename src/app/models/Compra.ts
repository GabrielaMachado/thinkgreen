import { Solicitud } from './Solicitud';
import { Cliente } from './Cliente';
import { Bolsita } from './Bolsita';

export class Compra {
    cliente: Cliente;
    bolsita: Bolsita;
    precio_total: number;
    impuestos: number;

    constructor() {
    }
}   