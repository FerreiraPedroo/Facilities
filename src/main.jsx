import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

import "./index.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <Provider>
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
