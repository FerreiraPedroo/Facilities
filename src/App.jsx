import { Routes, Route } from "react-router-dom";
import { Root } from "@pages/Root";
import { Home } from "@pages/Home";
import { ProjetoLista } from "@pages/Projeto/Lista";
import { ProjetoInfo } from "@pages/Projeto/Info";
import { RequisicaoLista } from "@pages/Requisicao/Lista";
import { RequisicaoInfo } from "@pages/Requisicao/Info";
import { ProjetoNovo } from "@pages/Projeto/Novo";
import { ItensLista } from "@pages/Itens/Lista";
import { ItemNovo } from "@pages/Itens/Novo";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />

        <Route path="/itens" element={<ItensLista />} />
        <Route path="/itens/novo" element={<ItemNovo />} />
        <Route path="/projetos" element={<ProjetoLista />} />
        <Route path="/projetos/novo" element={<ProjetoNovo />} />
        <Route path="/projetos/:projetoId" element={<ProjetoInfo />} />

        <Route path="/requisicoes" element={<RequisicaoLista />} />
        <Route path="/requisicoes/:requisaoId" element={<RequisicaoInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
