export interface IProjeto {
  id: number;
  codigo: string;
  classificacao: string;
  nome: string;
  unidade_id: string;
  status: string;
  data_abertura: string;
}

interface IOrcamento {}
export interface INovoProjeto extends IProjeto {
  orcamento: IOrcamento;
}
