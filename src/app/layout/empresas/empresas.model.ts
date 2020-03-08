export class EmpresasModel {
    id_empresa: Number = 0;
    nombre: string;
    rfc: string;
    giro: string;
    tipo: {type: string, enum: ['Privado', 'Gubernamental', 'Patronato', 'Fundacion', 'Sindicato',
    'Asociacion', 'Religiosa'], default: 'Privado'};
    areaAsignada: {type: string, enum: ['Desarrollo', 'Soporte', 'Infraestructura'], default: 'Desarrollo'};
    presencia: {type: string, enum: ['Local', 'Nacional', 'Internacional'], default: 'Local'};
    calle: string;
    noInterior: string;
    noExterior: string;
    colonia: string;
    cp: string;
    municipio: string;
    numEmpleados: number;
    calificacion: number;
    descripcion: string;
    estatus: string;
}
