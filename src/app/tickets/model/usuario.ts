export interface Usuario {
  id: number;
  codigo: string;
  nome: string;
  email: string;
  telefone: string;
  gruposAssignadosId: number[];
  administrador: boolean;
}
