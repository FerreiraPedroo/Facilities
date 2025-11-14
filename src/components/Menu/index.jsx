import { useMemo } from "react";
import { Box, Button, Flex, Link, Menu, Portal, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const items = [
  {
    id: 2,
    label: "Projetos",
    icon: "",
    url: "/projetos",
  },
  {
    id: 1,
    label: "Requisicões",
    icon: "",
    url: "/requisicoes",
  },
];

const pathNav = {
  projetos: {
    label: "Projetos",
    url: "/projetos",
  },
  requisicoes: {
    label: "Requisicões",
    url: "/requisicoes",
  },
};

export function AppMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const botoes = useMemo(() => {
    return items.map((botao) => {
      return (
        <Menu.Item
          key={botao.id}
          value={botao.label}
          onClick={() => navigate(botao.url)}
          width="160px"
          p="2"
        >
          {botao.label}
        </Menu.Item>
      );
    });
  }, []);

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

      <Box>
        {pathNav[location.pathname.split("/")[1]] && (
          <Link
            textStyle="2xl"
            color="blue.subtle"
            fontWeight="medium"
            height="100%"
            textDecoration="none"
            onClick={() =>
              navigate(pathNav[location.pathname.split("/")[1]].url)
            }
          >
            {pathNav[location.pathname.split("/")[1]].label}
          </Link>
        )}
      </Box>
    </Flex>
  );
}
