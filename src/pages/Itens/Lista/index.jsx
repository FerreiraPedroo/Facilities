import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemRepository } from "@/repositories/itens.repository";
import { TreeViewComponent } from "../../../components/TreeView";

import "./styles.css";
// import { badgeStatus } from "../../../utils/badge";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Table,
} from "@chakra-ui/react";
import { badgeStatus } from "../../../utils/badge";

export function ItensList() {
  const navigate = useNavigate();

  const [itensList, setItensList] = useState([]);

  useEffect(() => {
    async function getItens() {
      try {
        const itens = await ItemRepository.getItensList();
        setItensList(itens);
      } catch (e) {
        console.log(e);
      }
    }
    getItens();
  }, []);

  return (
    <Container padding={0}>
      <Group h="64px" bg="blue.800" py="4" px="6" width="100%">
        <Button
          variant="surface"
          size="xs"
          _hover={{ bg: "blue.muted", color: "fg" }}
          onClick={() => navigate("/itens/novo")}
        >
          Novo item
        </Button>
      </Group>

      <Flex>
        {/* <Box paddingY="6" paddingX="4">
          <TreeViewComponent colorPalette={"green"}></TreeViewComponent>
        </Box> */}

        <Box paddingY="6" paddingX="4" w="full">
          <Table.Root size="sm" variant="outline" interactive showColumnBorder>
            <Table.Header>
              <Table.Row bg="silver">
                <Table.ColumnHeader
                  minW={"96px"}
                  textAlign={"center"}
                  userSelect={"none"}
                >
                  CODIGO
                </Table.ColumnHeader>

                <Table.ColumnHeader
                  width={"100%"}
                  textAlign={"center"}
                  userSelect={"none"}
                >
                  NOME
                </Table.ColumnHeader>

                <Table.ColumnHeader
                  minW={"160px"}
                  textAlign={"center"}
                  userSelect={"none"}
                >
                  CATEGORIA
                </Table.ColumnHeader>

                <Table.ColumnHeader
                  minW={"96px"}
                  textAlign={"center"}
                  userSelect={"none"}
                >
                  STATUS
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {itensList.map((item) => (
                <Table.Row
                  key={item.id}
                  _hover={{ bg: "slate", cursor: "pointer" }}
                  onClick={() => navigate(`/itens/${item.id}`)}
                >
                  <Table.Cell textAlign={"center"}>{item.code}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.category?.name}</Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    <Badge colorPalette={badgeStatus[item.status]} p="2">
                      {item.status}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Container>
  );
}
