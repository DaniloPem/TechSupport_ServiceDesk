import { StatusTicket } from './statusTicket';
import { TipoTicket } from './tipoTicket';

export interface DadosVisualizacaoTicketById {
  id: number;
  status: StatusTicket;
  dataEHorarioDeCriacao: string;
  tipo: TipoTicket;
  numeroTicketSegundoTipo: string;
  titulo: string;
  reportadoPorId: number;
  reportadoPorNome: string;
  reportadoPorCodigo: string;
  reportadoParaId: number;
  reportadoParaNome: string;
  reportadoParaCodigo: string;
  grupoAssignadoId: number;
  grupoAssignadoNome: string;
  gerenciadoPor: number;
  descricao: string;
  dadosPessoais: string;
  categoriaReportadaId: number;
  categoriaReportadaNome: string;
  categoriaAfetadaId: number;
  categoriaAfetadaNome: string;
  tagId: number;
  tagNome: string;
  subtagId: number;
  subtagNome: string;
  solucao: string;
  solucaoDadosPessoais: string;
}
