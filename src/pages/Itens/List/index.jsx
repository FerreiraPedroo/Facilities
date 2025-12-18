import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Table,
} from "@chakra-ui/react";

import { ItemRepository } from "@/repositories/itens.repository";
import { badgeStatus } from "../../../utils/badge";
import "./styles.css";
import { ImportFile } from "@/utils/importFile";

export function ItensList() {
  const navigate = useNavigate();

  const [itensList, setItensList] = useState([]);

  const handleImportItem = useCallback(async (importItens) => {
    try {
      return await ItemRepository.saveImportItens(importItens);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

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

  // console.log(itens);

  return (
    <Container padding={0}>
      <Flex h="64px" bg="blue.800" py="3" px="6" width="100%" gap="6">
        <Button
          variant="surface"
          _hover={{ bg: "blue.muted", color: "fg" }}
          onClick={() => navigate("/itens/novo")}
        >
          Novo item
        </Button>

        <ImportFile
          textButton={"Importar item"}
          callBackSaveItens={handleImportItem}
        />

        {/* <Button
          variant={"surface"}
          _hover={{ bg: "blue.muted", color: "fg" }}
          onClick={handleImportItem}
        >
          Importar item
        </Button> */}
      </Flex>

      <Flex>
        <Box paddingY="4" paddingX="4" w="full">
          <Table.Root
            py="0"
            size="sm"
            variant="outline"
            interactive
            showColumnBorder
          >
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
                  <Table.Cell px="2">{item.name}</Table.Cell>
                  <Table.Cell px="2">{item.category?.name}</Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    <Badge colorPalette={badgeStatus[item.status]} px="2">
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
