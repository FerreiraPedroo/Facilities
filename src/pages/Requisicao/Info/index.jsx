import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';

import "./styles.css";


export function RequisicaoInfo() {
 const { id } = useParams();

 const [requisicaoAlterado, setRequisicaoAlterado] = useState({});

 const [requisicao, setRequisicao] = useState(
  { 
   req: "061004",
   resumo: "Piso e rodapé de granito - Clin vet - BGS",
   data_abertura: "20/05/2025",
   data_retorno_cotacao: "25/05/2025",
   data_aprovacao_gerencia: "30/05/2025",
   data_entrega: "10/06/2025",
   justificativa: "Materiais para Manunt. corretivas Câmeras e Alarmes - Compras diretas - BS",
   observacao: "Esta requisição está em atrazo.",
   notas_fiscais: [],
   projetos: [{id: 12345, codigo:"PRO0341", titulo: "[BS] Clínica Veterinária", unidade: "Sede", periodo: "2025-2"}],
   itens: [
    {
     cod: "50.55.00047",
     descricao: "JOELHO 40 (ESGOTO) - JOELHO DE 90° COLA",
     quantidade: 4
    },
    {
     cod: "50.55.00002",
     descricao: "JOELHO 90X25MM MARROM COLA MARCA TIGRE",
     quantidade: 5
    },
    {
     cod: "50.55.00017",
     descricao: "ADAPTADOR 25MM X 3/4 MARROM DE COLA PARA ROSCA MARCA",
     quantidade: 1
    },
    {
     cod: "50.55.00005",
     descricao: "LUVA 25MM PVC MARROM COLA MARCA TIGRE",
     quantidade: 4
    },
    {
     cod: "50.55.00117",
     descricao: "Joelho 90° PVC Soldável x Bucha Latão 25mm x 3/4",
     quantidade: 1
    }
   ]
  })


 function handleRequisicao(value, name){

  setRequisicaoAlterado((prev) => {
   return { ...prev, [name]: value};
  })
 }


return (
<div className="w-full p-2">

<Panel header={`REQ ${requisicao.req} - ${requisicao.resumo}`}>
 <div className="flex items-end gap-6 mb-8 text-xl border-1 rounded-lg  border-stone-300">
    <p className="p-4">Justificativa: {requisicao.justificativa}</p>
 </div>

 <Divider />

 <div className="flex items-end gap-10 mb-6">
  <div className="">
   <label htmlFor="buttondisplay" className="font-bold block mb-2">
    Data de abertura
   </label>
   <Calendar id="data_abertura" name="data_abertura" value={requisicaoAlterado.data_abertura || requisicao.data_abertura} onChange={(e) => handleRequisicao(e.value, e.target.name)} showIcon />
  </div>

  <div className="">
   <label htmlFor="buttondisplay" className="font-bold block mb-2">
    Data de abertura
   </label>
   <Calendar id="data_retorno_cotacao" name="data_retorno_cotacao" value={requisicaoAlterado.data_retorno_cotacao || requisicao.data_retorno_cotacao} onChange={(e) => handleRequisicao(e.value, e.target.name)} showIcon />
  </div>

  <div className="">
   <label htmlFor="buttondisplay" className="font-bold block mb-2">
    Data aprovação da gerência
   </label>
   <Calendar id="data_aprovacao_gerencia" name="data_aprovacao_gerencia" value={requisicaoAlterado.data_aprovacao_gerencia || requisicao.data_aprovacao_gerencia} onChange={(e) => handleRequisicao(e.value, e.target.name)} showIcon />
  </div>
  
  <div className="">
   <label htmlFor="buttondisplay" className="font-bold block mb-2">
    Data de entrega
   </label>
   <Calendar id="data_entrega" name="data_entrega" value={requisicaoAlterado.data_entrega || requisicao.data_entrega} onChange={(e) => handleRequisicao(e.value, e.target.name)} showIcon />
  </div>

 </div>

 <Divider />

 <TabView>
  <TabPanel header="Projeto">
   <Card title={`${requisicao.projetos[0].codigo} - ${requisicao.projetos[0].titulo}`}>
    <p className="m-0">Unidade: {requisicao.projetos[0].unidade}</p>
    <p className="m-0">Periodo: {requisicao.projetos[0].periodo}</p>
   </Card>
  </TabPanel>

  <TabPanel header="Itens">
   <DataTable value={requisicao.itens} size="small" tableStyle={{ minWidth: '100%' }}>
    <Column field="cod" header="Código" style={{ width: '256px' }}></Column>
    <Column field="descricao" header="Descrição" style={{ width: '80%' }}></Column>
    <Column field="quantidade" header="Quantidade" style={{ width: '256px' }}></Column>
   </DataTable>
  </TabPanel>

  <TabPanel header="Requisições">
   <p className="m-0"></p>
  </TabPanel>
  
 </TabView>
 </Panel>
</div>
 )
}

