import { Usuario } from './Usuario';

export class Cliente extends Usuario{
    id?: string;
    telefono?: string;
    edad?: number;
    direccion?: string;
    pais?: string;
    ciudad?: string;
    tipo?: boolean;
    isAdmin?: boolean;
    
}
