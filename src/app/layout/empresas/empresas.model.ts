export class EmpresasModel {
    id_alumno: Number = 0;
    nombre: string;
    numseguro: string;
    nivel: {type: string, enum: ['TSU', 'ING'], default: 'TSU'};
    carrera: {type: string, enum: ['TIC', 'ITIC'], default: 'TIC'};
    sede = '';
    id_asesorin: Number = 0;
    id_asesoraca: Number = 0;
    id_proyecto: Number = 0;
    fecha_alta: Date;
    fecha_update: Date ;
}
