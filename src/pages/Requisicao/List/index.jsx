import { useState } from 'react';
import { PageTitle } from "@components/PageTitle";
import { Botao } from "@components/Botao";

const pageTitle = "Requisições";



export function RequisicaoList() {
  return (
    <div className="w-full p-2">
      <PageTitle title={ pageTitle }/>
      <div>
        <Botao text="Registrar" />
      </div>

    </div>
  )
}

