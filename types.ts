export type Alert = {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string | null;
  severidad: string | null;
  fechaCreacion: string;
  fechaActualizacion: string;
  usuarioId?: number;
  usuarioNombre?: string;
  latitud: number;
  longitud: number;
  direccion?: string;
  barrio?: string;
};