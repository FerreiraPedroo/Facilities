import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Root } from "@pages/Root";
import { Home } from "@pages/Home";
import { RequisicaoList } from "@pages/Requisicao/List";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route path="/requisicoes" element={ <RequisicaoList/> }/>
      </Route>
    </Routes>
  )
}

export default App
