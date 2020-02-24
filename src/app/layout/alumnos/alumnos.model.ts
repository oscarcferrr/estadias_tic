export class AlumnosModel {
    id_alumno: Number = 0;
    nombre: string;
    numseguro: string;
    nivel: {type: string, enum: ['TSU', 'ING'], default: 'TSU'};
    carrera: {type: string, enum: ['TIC', 'ITIC'], default: 'TIC'};
    sede = '1Mayo';
    estatus = 'activo';
    id_asesorin: Number = 1;
    id_asesoraca: Number = 1;
    id_proyecto: Number = 1;
    fecha_alta: Date;
    fecha_update: Date ;
}
