import { StatusTicket } from './statusTicket';
import { TipoTicket } from './tipoTicket';

export interface DadosVisualizacaoTicketById {
  status: StatusTicket;
  dataEHorarioDeCriacao: string;
  tipo: TipoTicket;
  numeroTicketSegundoTipo: string;
  titulo: string;
  reportadoPorId: number;
  reportadoPorNome: string;
  reportadoPorCodigo: string;
  reportadoParaId: number;
  grupoAssignadoId: number;
  gerenciadoPor: number;
  descricao: string;
  dadosPessoais: string;
  categoriaReportadaId: number;
  categoriaAfetadaId: number;
  tagId: number;
  subtagId: number;
  solucao: string;
  solucaoDadosPessoai: string;
}
