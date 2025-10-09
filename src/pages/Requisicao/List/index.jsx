import { useState } from 'react';
import { PageTitle } from "@components/PageTitle";
import { useNavigate } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

import "./styles.css";

const pageTitle = "Requisições";

const columns = [
  { field: 'req', headerName: 'REQUISIÇÃO', width: 112 },
  {
    field: 'classificacao',
    headerName: 'CLASSIFICAÇÃO',
    width: 128,
    editable: false,
  },
  {
    field: 'resumo',
    headerName: 'RESUMO',
    width: 480,
    editable: false,
  },
  {
    field: 'projeto',
    headerName: 'PROJETO',
    width: 256,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 192,
    editable: false,
  }
];

//   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,



export function RequisicaoList() {
 const navigate = useNavigate();


 const [reqList, setReqList] = useState(
[
  {
    "id": 1,
    "req": "7167",
    "classificacao": "OPEX",
    "resumo": "Atualizar a interface do usuário para uma experiência mais moderna.",
    "status": "PEND COTAÇÃO"
  },
  {
    "id": 2,
    "req": "345",
    "classificacao": "CAPEX",
    "resumo": "O botão de login não responde em dispositivos móveis.",
    "status": "FINALIZADO"
  },
  {
    "id": 3,
    "req": "9021",
    "classificacao": "CAPEX",
    "resumo": "Implementar a opção de exportar dados para CSV.",
    "status": "FINALIZADO"
  },
  {
    "id": 4,
    "req": "4887",
    "classificacao": "OPEX",
    "resumo": "Otimizar o tempo de carregamento da página inicial.",
    "status": "FINALIZADO"
  },
  {
    "id": 5,
    "req": "1234",
    "classificacao": "OPEX",
    "resumo": "Erro 500 ao tentar salvar as configurações do perfil.",
    "status": "PEND AP GERENCIA"
  },
  {
    "id": 6,
    "req": "5678",
    "classificacao": "OPEX",
    "resumo": "Adicionar suporte para autenticação de dois fatores.",
    "status": "PEND AP GERENCIA"
  },
  {
    "id": 7,
    "req": "2345",
    "classificacao": "CAPEX",
    "resumo": "Melhorar a acessibilidade para leitores de tela.",
    "status": "PEND ENTREGA"
  },
  {
    "id": 8,
    "req": "8765",
    "classificacao": "CAPEX",
    "resumo": "O campo de pesquisa não retorna resultados relevantes.",
    "status": "Em Andamento"
  },
  {
    "id": 9,
    "req": "4321",
    "classificacao": "CAPEX",
    "resumo": "Criar um painel de administração para gerenciamento de usuários.",
    "status": "Em Análise"
  },
  {
    "id": 10,
    "req": "9876",
    "classificacao": "CAPEX",
    "projeto": "PRO0341 - Clínica Veterinária",
    "resumo": "Adicionar mais opções de personalização ao perfil do usuário.",
    "status": "Aberto"
  }
])





  const [rowSelectionModel, setRowSelectionModel] = useState([]);

 return (
  <div className="flex flex-col gap-4 m-4">

   <div>
    <PageTitle title={ pageTitle }/>
   </div>

      <DataGrid
        rows={reqList}
        columns={columns}
	sx={{ '& .MuiDataGrid-row': { cursor: 'pointer' } }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[100]}
        density="compact"
        checkboxSelection={false}
	onCellClick={(params)=>navigate(`/requisicoes/${params.row.id}`)}
      />

  </div>
 )
}

