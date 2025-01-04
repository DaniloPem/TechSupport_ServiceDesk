import { DadosVisualizacaoAllTags } from './dadosVisualizacaoAllTags';

export interface TagPage {
  tags: DadosVisualizacaoAllTags[];
  totalTags: number;
  totalPages: number;
}
