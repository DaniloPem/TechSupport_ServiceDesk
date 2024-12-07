export interface Ticket {
  id: number;
  status: string;
  dataEHorarioDeCriacao: string;
  tipo: string;
  numeroTicketSegundoTipo: string;
  titulo: string;
  reportadoPorId: number;
  reportadoParaId: number;
  grupoAssignadoId: number;
  gerenciadoPor: string;
  descricao: string;
  dadosPessoais: string;
  categoriaReportadaId: number;
  categoriaAfetadaId: number;
  tagId: number;
  subtagId: number;
  solucao: string;
  solucaoDadosPessoais: string;
}
