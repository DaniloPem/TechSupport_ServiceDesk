export interface DadosVisualizacaoUsuario {
  id: number;
  codigo: string;
  nome: string;
  email: string;
  telefone: string;
  gruposAssignadosId: number[];
  gruposAssignadosNome: string[];
  administrador: boolean;
}
