import { StatusTicket } from './statusTicket';

export interface DadosVisualizacaoTicketPorTipo {
  id: number;
  status: StatusTicket;
  dataEHorarioDeCriacao: string;
  numeroTicketSegundoTipo: string;
  titulo: string;
  reportadoPorNome: string;
  reportadoPorCodigo: string;
  reportadoParaNome: string;
  reportadoParaCodigo: string;
  grupoAssignadoNome: string;
  categoriaReportadaNome: string;
  categoriaAfetadaNome: string;
  tagNome: string;
  subtagNome: string;
}
