export interface Ticket {
  id: string;
  status: string;
  dataEHorarioDeCriacao: string;
  tipo: string;
  numeroTicketSegundoTipo: string;
  titulo: string;
  reportadoPor: string;
  reportadoPara: string;
  grupoAssignado: string;
  gerenciadoPor: string;
  descricao: string;
  dadosPessoais: string;
  categoriaReportada: string;
  categoriaAfetada: string;
  tag: string;
  subtag: string;
  solucao: string;
  solucaoDadosPessoais: string;
}
