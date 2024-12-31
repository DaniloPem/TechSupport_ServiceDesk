export interface DadosVisualizacaoAllUsuarios {
  id: number;
  codigo: string;
  nome: string;
  email: string;
  telefone: string;
  gruposAssignados: string[];
  administrador: boolean;
}
