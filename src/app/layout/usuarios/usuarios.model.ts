export class UsuariosModel {
    id: Number = 0;
    usuario: string;
    contrasena: string;
    tipo: { type: string, enum: ['Admin', 'Consulta'] };
    estatus: string;
}
