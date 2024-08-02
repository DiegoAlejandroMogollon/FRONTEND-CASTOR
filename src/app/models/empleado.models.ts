export interface Empleado {
    id: number;
    cedula: number;
    nombre: string;
    fotoRuta: string;
    fechaIngreso: string;
    cargo: {
      idCargo: number;
      nombre: string;
    };
  }
  