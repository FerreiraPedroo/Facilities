import { useState } from 'react';
import { PageTitle } from "@components/PageTitle";
import { useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import "./styles.css";

const pageTitle = "Requisições";


export function RequisicaoList() {
 const navigate = useNavigate();

 const [reqList, setReqList] = useState([{"req":"7167","classificacao":"Melhoria","resumo":"Atualizar a interface do usuário para uma experiência mais moderna.","status":"Em Andamento"},{"req":"345","classificacao":"Bug","resumo":"O botão de login não responde em dispositivos móveis.","status":"Aberto"},{"req":"9021","classificacao":"Nova Funcionalidade","resumo":"Implementar a opção de exportar dados para CSV.","status":"Concluído"},{"req":"4887","classificacao":"Melhoria","resumo":"Otimizar o tempo de carregamento da página inicial.","status":"Em Andamento"},{"req":"1234","classificacao":"Bug","resumo":"Erro 500 ao tentar salvar as configurações do perfil.","status":"Em Análise"},{"req":"5678","classificacao":"Nova Funcionalidade","resumo":"Adicionar suporte para autenticação de dois fatores.","status":"Aberto"},{"req":"2345","classificacao":"Melhoria","resumo":"Melhorar a acessibilidade para leitores de tela.","status":"Concluído"},{"req":"8765","classificacao":"Bug","resumo":"O campo de pesquisa não retorna resultados relevantes.","status":"Em Andamento"},{"req":"4321","classificacao":"Nova Funcionalidade","resumo":"Criar um painel de administração para gerenciamento de usuários.","status":"Em Análise"},{"req":"9876","classificacao":"Melhoria","resumo":"Adicionar mais opções de personalização ao perfil do usuário.","status":"Aberto"}])


 return (
  <div className="w-full p-2">

   <div>
    <PageTitle title={ pageTitle }/>
   </div>

   <DataTable
    dataKey="req"
    value={reqList}
    sortMode="multiple"
    size="small"
    tableStyle={{ minWidth: '50rem' }}
    selectionMode="single"
    onRowSelect={(row)=> navigate(`/requisicoes/${row.data.req}`)}
    metaKeySelection={false}
   >
    <Column field="req" header="REQ" sortable style={{ width: '20%' }}></Column>
    <Column field="classificacao" header="Classificação" style={{ width: '20%' }}></Column>
    <Column field="resumo" header="Resumo" style={{ width: '40%' }}></Column>
    <Column field="status" header="Status" sortable style={{ width: '20%' }}></Column>
   </DataTable>

  </div>
 )
}

