import { Routes, Route } from "react-router-dom";
import { Root } from "@pages/Root";
import { Home } from "@pages/Home";
import { RequisicaoLista } from "@pages/Requisicao/Lista";
import { RequisicaoInfo } from "@pages/Requisicao/Info";
import { ItensList } from "@pages/Itens/Lista";
import { ItemNovo } from "@pages/Itens/Novo";
import { ProjectNew } from "./pages/Project/New";
import { ProjectList } from "./pages/Project/List";
import { ProjectInfo } from "./pages/Project/Info";

// import "./database/seed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />

        <Route path="/itens" element={<ItensList />} />
        <Route path="/itens/novo" element={<ItemNovo />} />
        <Route path="/projetos" element={<ProjectList />} />
        <Route path="/projetos/novo" element={<ProjectNew />} />
        <Route path="/projetos/:projectId" element={<ProjectInfo />} />

        <Route path="/requisicoes" element={<RequisicaoLista />} />
        <Route path="/requisicoes/:requisaoId" element={<RequisicaoInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
