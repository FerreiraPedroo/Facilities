import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./styles.css";
import {
  Badge,
  Box,
  Card,
  DataList,
  Flex,
  FormatNumber,
  Stack,
  Table,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import { badgeStatus } from "../../../utils/badge";
import { LiaFileInvoiceSolid } from "react-icons/lia";

export function RequisicaoInfo() {
  const { requisicaoId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [requisicao, setRequisicao] = useState({
    id: 10,
    requisicao: "063000",
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
        valor_orcado: 2.40,
        valor_nf: 3.40,
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
      {
        id: "20",
        codigo: "50.56.00028",
        descricao: "LAMPADA FLUORESCENTE TUBULAR 40W",
        quantidade: 25,
        valor_orcado: 2.40,
        valor_nf: 3.40,
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
      {
        id: "20",
        codigo: "50.56.00028",
        descricao: "LAMPADA FLUORESCENTE TUBULAR 40W",
        quantidade: 25,
        valor_orcado: 2.40,
        valor_nf: 3.40,
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
  });

  return (
    <Box>
      <Tabs.Root
        defaultValue={location.hash.substring(1) || "informacoes"}
        variant="plain"
        width="100%"
      >
        <Tabs.List h="64px" bg="blue.800" py="3" px="6" width="100%">
          <Tabs.Trigger
            onClick={() => navigate("#informacoes")}
            value="informacoes"
            color={"white"}
          >
            <LuUser />
            Informações
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => navigate("#itens")}
            value="itens"
            color={"white"}
          >
            <LuFolder />
            Itens
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => navigate("#notasfiscais")}
            value="notasfiscais"
            color={"white"}
          >
            <LiaFileInvoiceSolid />
            Notas fiscais
          </Tabs.Trigger>
          <Tabs.Indicator rounded="l2" bg="blue.600" />
        </Tabs.List>

        <Tabs.Content value="informacoes" p="6">
          <DataList.Root orientation="horizontal" size="md">
            <DataList.Item variant="bold">
              <DataList.ItemLabel>Requisição</DataList.ItemLabel>
              <DataList.ItemValue>{requisicao.requisicao}</DataList.ItemValue>
            </DataList.Item>

            <DataList.Item variant="bold">
              <DataList.ItemLabel>Status</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge
                  colorPalette={badgeStatus[requisicao.status]}
                  py="1"
                  px="2"
                >
                  {requisicao.status}
                </Badge>
              </DataList.ItemValue>
            </DataList.Item>

            <DataList.Item variant="bold">
              <DataList.ItemLabel>Nome</DataList.ItemLabel>
              <DataList.ItemValue>{requisicao.nome}</DataList.ItemValue>
            </DataList.Item>

            <DataList.Item variant="bold">
              <DataList.ItemLabel>Justificativa</DataList.ItemLabel>
              <DataList.ItemValue>{requisicao.justificativa}</DataList.ItemValue>
            </DataList.Item>

            <DataList.Item variant="bold">
              <DataList.ItemLabel>Data de abertura</DataList.ItemLabel>
              <DataList.ItemValue>
                {requisicao.data_abertura}
              </DataList.ItemValue>
            </DataList.Item>

          </DataList.Root>
        </Tabs.Content>

        <Tabs.Content value="itens" p="6">
          <DataList.Root orientation="horizontal" size="md" pb="5" px="10">
            <DataList.Item>
              <DataList.ItemLabel color="black" fontWeight="medium" width="136px">
                Valor orçado
              </DataList.ItemLabel>
              <DataList.ItemValue color="black" fontWeight="bolder">
                <FormatNumber
                  value={requisicao.itens.reduce((acc, cur) => {
                    return acc + (cur.valor_orcado * cur.quantidade);
                  }, 0)}
                  style="currency"
                  currency="BRL"
                />
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel color="black" fontWeight="medium" width="136px">
                Valor NF
              </DataList.ItemLabel>
              <DataList.ItemValue color="black" fontWeight="bolder">
                <FormatNumber
                  value={requisicao.itens.reduce((acc, cur) => {
                    return acc + (cur.valor_nf * cur.quantidade);
                  }, 0)}
                  style="currency"
                  currency="BRL"
                />
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>

          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader px="4">CÓDIGO</Table.ColumnHeader>
                <Table.ColumnHeader px="2">ITEM</Table.ColumnHeader>
                <Table.ColumnHeader>QUANTIDADE</Table.ColumnHeader>
                <Table.ColumnHeader px="4">VALOR</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {requisicao.itens.map((item) => {
                return (
                  <Table.Row>
                    <Table.Cell px="4">{item.codigo}</Table.Cell>
                    <Table.Cell px="2" width="80%">{item.descricao}</Table.Cell>
                      <Table.Cell textAlign="center">{item.quantidade}</Table.Cell>
                    <Table.Cell px="4" minWidth="128px">
                      <FormatNumber
                        value={item.valor_orcado}
                        style="currency"
                        currency="BRL"
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Tabs.Content>

        {/* <Tabs.Content value="requisicoes" p="6">
          {requisicao.requisicoes.map((requisicao) => {
            return (
              <Stack>
                <Card.Root
                  size="sm"
                  borderWidth="1px"
                  onClick={() =>
                    navigate(`/requisicoes/${requisicao.requisicao}`)
                  }
                  _hover={{
                    cursor: "pointer",
                    borderColor: "border.info",
                    borderWidth: "1px",
                    bg: "bg.info",
                  }}
                >
                  <Card.Body color="fg.muted" px="4" py="3" gap="1">
                    <Flex direction={"row"}>
                      <Text
                        size="md"
                        fontWeight="semibold"
                        color="black"
                        placeContent={"center"}
                      >
                        <Badge
                          colorPalette={badgeStatus[requisicao.status]}
                          mr="4"
                          p="4"
                        >
                          {requisicao.status}
                        </Badge>
                      </Text>

                      <Box>
                        <Text size="md" fontWeight="semibold" color="black">
                          REQ {requisicao.requisicao} - {requisicao.nome}
                        </Text>
                        <Text size="md">
                          Justificativa: {requisicao.justificativa}
                        </Text>
                      </Box>
                    </Flex>
                  </Card.Body>
                </Card.Root>
              </Stack>
            );
          })}
        </Tabs.Content> */}
      </Tabs.Root>
    </Box>
  );
}
