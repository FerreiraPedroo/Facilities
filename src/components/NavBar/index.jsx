import * as React from "react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();


  return (
    <header class="w-100">
      <div class="w-100 px-3 py-2 text-bg-dark border-bottom position-fixed z-3">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <button onClick={()=> navigate("/requisicoes")} class="nav-link text-white">
                  Requisições
                </button>
              </li>
              <li>
                <button onClick={()=> navigate("/pedidos")} class="nav-link text-white">
                  Pedidos
                </button>
              </li>
              <li>
                <button onClick={()=> navigate("/fornecedores")} class="nav-link text-white">
                  Fornecedores
                </button>
              </li>
              <li>
                 <button onClick={()=> navigate("/itens")} class="nav-link text-white">
                  Itens
                </button>
              </li>
            </ul>
          </div>
        </div>
    </header>
  );
}
