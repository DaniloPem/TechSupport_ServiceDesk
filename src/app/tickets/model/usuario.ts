export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  gruposAssignadosId: number[];
  administrador: boolean;
}
