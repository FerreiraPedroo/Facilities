import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import "./styles.css";


export function RequisicaoInfo() {
 const { id } = useParams();

 const [requisicao, setRequisicao] = useState(
  { 
   requisicao: "061004",
   resumo: "Piso e rodapé de granito - Clin vet - BGS",
   data_abertura: "20/05/2025",
   data_retorno_cotacao: "25/05/2025",
   data_aprovacao_gerencia: "30/05/2025",
   data_entrega: "10/06/2025",
   justificativa: "Materiais para Manunt. corretivas Câmeras e Alarmes - Compras diretas - BS",
   observacao: "Esta requisição está em atrazo.",
   projetos: [{id: 12345, codigo:"PRO0341", titulo: "[BS] Clínica Veterinária", unidade: "Sede", periodo: "2025-2"}],
   notas_fiscais: [
    {
     id: 1,
     numero_nf: 123,
     fornecedor: "CHATUBA DE NILOPOLIS",
     pedido_compras: 45004,
     requisicao: "061004",
     data_recebimento: "09/09/2025"
    },
    {
     id: 2,
     numero_nf: 456,
     fornecedor: "FRIGELAR COMERCIO",
     pedido_compras: 45005,
     requisicao: "061004",
     data_recebimento: "12/09/2025"
    }
   ],
   itens: [
    {
     cod: "50.55.00047",
     descricao: "JOELHO 40 (ESGOTO) - JOELHO DE 90° COLA",
     quantidade: 4,
     nota_fiscal: [{id: 1, quantidade: 2}, {id: 2, quantidade: 2} ]
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




return (
<div className="flex flex-col m-4">
 <Paper elevation={1} className="flex flex-col gap-4 p-4">

  <Typography variant="h4">REQ {requisicao.requisicao}</Typography>

    <Stack 
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
	maxWidth: '1024px'
        }}
    >
        <TextField
          label="REQUISIÇÃO"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
	  sx={{ width: '20%' }}
        />
        <TextField
          label="RESUMO"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
	  sx={{ width: '80%' }}
        />
    </Stack>

    <Stack 
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
	maxWidth: '1024px'
        }}
    >
        <TextField
          label="JUSTIFICATIVA"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
	  sx={{ width: '60%' }}
        />
        <TextField
          label="PROJETO"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
	  sx={{ width: '40%' }}
        />
   </Stack>


      <Accordion sx={{maxWidth: '1024px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-detalhes-req"
          id="panel-detalhes-req"
        >
          <Typography component="span">DETALHES DA REQUISIÇÃO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{maxWidth: '1024px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-projeto"
          id="panel-projeto"
        >
          <Typography component="span">PROJETO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>



 </Paper>
</div>

)

}

