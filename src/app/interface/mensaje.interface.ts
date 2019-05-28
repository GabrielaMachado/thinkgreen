export interface Mensaje {
    chatId: string;
    mensaje: string;
    fecha?: number;
    enviadoAdmin: boolean;
    nombre: string;
}