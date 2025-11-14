import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { Badge, Box, Button, Container, Group, Table } from "@chakra-ui/react";
import { badgeStatus } from "../../../utils/badge";

export function RequisicaoLista() {
  const navigate = useNavigate();

  const [requisicaoLista, setRequisicaoLista] = useState([
    {
      id: 10,
      requisicao: "063000",
      nome: "Materiais de serralheria - Obra - BS",
      justificativa:
        "Pedido para ser utilizado os m ateriais na serralheira, em todo o tem que quiser fazer algum mível para ser utilizado na UNISUAM.",
      data_abertura: "13/11/2025",
      projeto: "PRO0341 - Clínica veterinária",
      status: "PEND_COT",
    },
    {
      id: 11,
      requisicao: "063002",
      nome: "Materiais de serralheria - Obra - BS",
      justificativa:
        "Pedido para ser utilizado os m ateriais na serralheira, em todo o tem que quiser fazer algum mível para ser utilizado na UNISUAM.",
      data_abertura: "13/11/2025",
      status: "PEND_COT",
      itens: [
        {
          id: "20",
          codigo: "50.56.00028",
          descricao: "LAMPADA FLUORESCENTE TUBULAR 40W",
          quantidade: 25,
          centro_custo: {
            id: 1,
            codigo: "01.004.008.02",
            nome: "Facilities",
          },
          conta_contabil: {
            id: 1,
            codigo: "1321305",
            nome: "Obras",
          },
        },
      ],
    },
  ]);

  return (
    <Container padding={0}>
      <Group h="64px" bg="blue.800" py="4" px="6" width="100%">
        <Button
          variant="surface"
          size="xs"
          _hover={{ bg: "blue.muted", color: "fg" }}
        >
          Nova requisição
        </Button>
      </Group>

      <Box paddingY="6" paddingX="4">
        <Table.Root size="sm" variant="outline" interactive showColumnBorder>
          <Table.Header>
            <Table.Row bg="silver">
              <Table.ColumnHeader
                width={"128px"}
                textAlign={"center"}
                userSelect={"none"}
              >
                REQUISIÇÃO
              </Table.ColumnHeader>
              <Table.ColumnHeader userSelect={"none"}>NOME</Table.ColumnHeader>
              <Table.ColumnHeader
                width={"320px"}
                textAlign={"center"}
                userSelect={"none"}
              >
                PROJETO
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
            {requisicaoLista.map((requisicao) => (
              <Table.Row
                key={requisicao.id}
                _hover={{ bg: "slate", cursor: "pointer" }}
                onClick={() => navigate(`/requisicoes/${requisicao.id}`)}
              >
                <Table.Cell textAlign={"center"}>
                  {requisicao.requisicao}
                </Table.Cell>
                <Table.Cell>{requisicao.nome}</Table.Cell>
                <Table.Cell>{requisicao.projeto}</Table.Cell>
                <Table.Cell textAlign={"center"}>
                  <Badge colorPalette={badgeStatus[requisicao.status]} p="2">
                    {requisicao.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  );
}
