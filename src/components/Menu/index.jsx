import { useMemo } from "react";
import { Box, Button, Flex, For, Menu, Portal } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MenuCaminho } from "../../utils/breadCrumb";

const items = [
  {
    id: 1,
    label: "Itens",
    icon: "",
    url: "/itens",
  },
  {
    id: 2,
    label: "Projetos",
    icon: "",
    url: "/projetos",
  },
  {
    id: 3,
    label: "Requisicões",
    icon: "",
    url: "/requisicoes",
  },
];

export function AppMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const botoes = useMemo(() => {
    return (
      <For each={items}>
        {(botao) => (
          <Menu.Item
            key={botao.id}
            value={botao.label}
            onClick={() => navigate(botao.url)}
            width="160px"
            p="2"
          >
            {botao.label}
          </Menu.Item>
        )}
      </For>
    );
  }, []);

  const Caminho = useMemo(() => {
    return <MenuCaminho caminho={location.pathname.split("/").slice(1)} />;
  }, [location]);

  return (
    <Flex background="blue.950" width="100%" paddingX="6" paddingY="3" gap={8}>
      <Menu.Root>
        <Menu.Trigger asChild p="0" m="0" _hover={{ bg: "blue.muted" }}>
          <Button variant="surface" size="sm" p="0" bg="blue.subtle">
            <FiMenu />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content padding={2}>{botoes}</Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <Box>{Caminho}</Box>
    </Flex>
  );
}
