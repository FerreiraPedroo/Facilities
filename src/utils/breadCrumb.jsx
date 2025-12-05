import { Breadcrumb, For, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const caminhoNav = {
  itens: {
    label: "Itens",
    url: "/itens",
    novo: {
      label: "Novo",
    },
  },
  projetos: {
    label: "Projetos",
    url: "/projetos",
    novo: {
      label: "Novo",
    },
  },
  requisicoes: {
    label: "Requisicões",
    url: "/requisicoes",
    novo: {
      label: "Novo",
    },
  },
};

function caminhoRecursivo(caminho) {
  let caminhoAtual = caminhoNav;

  if (!caminho.length) {
    return null;
  }

  for (let i = 0; i < caminho.length; i++) {
    caminhoAtual = caminhoAtual[caminho[i]];
  }

  return caminhoAtual;
}

export function MenuCaminho({ caminho }) {
  const navigate = useNavigate();
  return (
    <Stack>
      <Breadcrumb.Root size="lg">
        <Breadcrumb.List>
          <For each={caminho}>
            {(size, index) => {
              const caminhoAtual = caminho.slice(0, index + 1);

              // if(typeof caminhoAtual == "number"){
              //   console.log("OK")
              // }
              const result = caminhoRecursivo(caminhoAtual);

              if (!result) {
                return null;
              }

              if (index > 0 && index + 1 >= caminho.length) {
                return (
                  <Fragment key={result.label}>
                    <Breadcrumb.Separator
                      pt="1.5"
                      color="blue.subtle"
                      fontWeight="medium"
                    ></Breadcrumb.Separator>
                    <Breadcrumb.Item key={result.label}>
                      <Breadcrumb.CurrentLink
                        href="#"
                        textStyle="2xl"
                        color="white"
                        fontWeight="medium"
                        height="100%"
                        textDecoration="none"
                        outline="none"
                        cursor="default"
                      >
                        {result.label}
                      </Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
                  </Fragment>
                );
              }

              if (index > 0) {
                return (
                  <Fragment key={result.label}>
                    <Breadcrumb.Separator
                      pt="1.5"
                      color="white"
                      fontWeight="medium"
                    ></Breadcrumb.Separator>
                    <Breadcrumb.Item key={result.label}>
                      <Breadcrumb.Link
                        onClick={() => navigate(result.url)}
                        textStyle="2xl"
                        color="white"
                        fontWeight="medium"
                        height="100%"
                        textDecoration="none"
                        outline="none"
                        cursor="pointer"
                      >
                        {result.label}
                      </Breadcrumb.Link>
                    </Breadcrumb.Item>
                  </Fragment>
                );
              }

              return (
                <Breadcrumb.Item key={result.label}>
                  <Breadcrumb.Link
                    onClick={() => navigate(result.url)}
                    textStyle="2xl"
                    color="white"
                    fontWeight="medium"
                    height="100%"
                    textDecoration="none"
                    outline="none"
                    cursor="pointer"
                  >
                    {result.label}
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
              );
            }}
          </For>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Stack>
  );
}
