import { DadosVisualizacaoAllUsuarios } from './dadosVisualizacaoAllUsuarios';

export interface UsuarioPage {
  usuarios: DadosVisualizacaoAllUsuarios[];
  totalUsuarios: number;
  totalPages: number;
}
