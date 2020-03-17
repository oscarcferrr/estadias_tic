export class UsuariosModel {
    id_usuario: Number = 0;
    usuario: string;
    contrasena: string;
    tipo: { type: string, enum: ['Admin', 'Consulta'] };
    estatus: string;
}
