import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { Box, Button, Container, Group, Table } from "@chakra-ui/react";

export function ProjetoLista() {
  const navigate = useNavigate();

  const [projetoLista, setProjetoLista] = useState([
    {
      id: 1,
      codigo: "PROO341 - Clínica veterinária",
      classificacao: "OPEX",
      nome: "Clínica veterinária - BS",
      unidade: "BS",
      status: "Ativo",
    },
    {
      id: 2,
      codigo: "PROO342 - Clínica veterinária",
      classificacao: "CAPEX",
      nome: "Clínica veterinária - BG",
      unidade: "BG",
      status: "Ativo",
    },
  ]);

  return (
    <Container padding={0}>
      <Group h="64px" bg="blue.800" py="4" px="6" width="100%">
        <Button
          variant="surface"
          size="xs"
          _hover={{ bg: "blue.muted", color: "fg" }}
          onClick={() => navigate("/projetos/novo")}
        >
          Novo projeto
        </Button>
        {/* <Button
          variant="surface"
          _hover={{ bg: "blue.muted", color: "fg" }}
        >
          Item 2
        </Button> */}
      </Group>

      <Box paddingY="6" paddingX="4">
        <Table.Root size="sm" variant="outline" interactive showColumnBorder>
          <Table.Header>
            <Table.Row bg="silver">
              <Table.ColumnHeader
                width={"64px"}
                textAlign={"center"}
                userSelect={"none"}
              >
                ID
              </Table.ColumnHeader>
              <Table.ColumnHeader
                width={"256px"}
                textAlign={"center"}
                userSelect={"none"}
              >
                CÓDIGO
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"} userSelect={"none"}>
                NOME
              </Table.ColumnHeader>
              <Table.ColumnHeader
                width={"128px"}
                textAlign={"center"}
                userSelect={"none"}
              >
                UNIDADE
              </Table.ColumnHeader>
              <Table.ColumnHeader
                width={"128px"}
                textAlign={"center"}
                userSelect={"none"}
              >
                CLASSIFICAÇÃO
              </Table.ColumnHeader>
              <Table.ColumnHeader
                width={"128px"}
                textAlign={"center"}
                userSelect={"none"}
              >
                STATUS
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {projetoLista.map((projeto) => (
              <Table.Row
                key={projeto.id}
                _hover={{ bg: "slate", cursor: "pointer" }}
                onClick={() => navigate(`/projetos/${projeto.id}`)}
              >
                <Table.Cell textAlign={"center"}>{projeto.id}</Table.Cell>
                <Table.Cell textAlign={"center"}>{projeto.codigo}</Table.Cell>
                <Table.Cell>{projeto.nome}</Table.Cell>
                <Table.Cell textAlign={"center"}>{projeto.unidade}</Table.Cell>
                <Table.Cell textAlign={"center"}>
                  {projeto.classificacao}
                </Table.Cell>
                <Table.Cell textAlign={"center"}>{projeto.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  );
}
