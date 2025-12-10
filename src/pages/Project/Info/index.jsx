import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./styles.css";
import {
  Badge,
  Bleed,
  Box,
  Card,
  Center,
  DataList,
  Flex,
  FormatNumber,
  Spinner,
  Stack,
  Table,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import { badgeStatus } from "../../../utils/badge";
import { ProjectRepository } from "@/repositories/project.repository";

// {
//     id: 1,
//     codigo: "PROO341 - Clínica veterinária",
//     classificacao: "OPEX",
//     nome: "Clínica veterinária - BS",
//     unidade: "BS",
//     status: "Ativo",
//     data_abertura: "20/05/2025",
//     orcamento: [
//       {
//         mes: "JANEIRO",
//         valor: 150.5,
//       },
//       {
//         mes: "FEVEREIRO",
//         valor: 150.5,
//       },
//       {
//         mes: "MARÇO",
//         valor: 150.5,
//       },
//       {
//         mes: "ABRIL",
//         valor: 150.5,
//       },
//       {
//         mes: "MAIO",
//         valor: 150.5,
//       },
//     ],
//     requisicoes: [
//       {
//         id: 10,
//         requisicao: "063000",
//         nome: "Materiais de serralheria - Obra - BS",
//         justificativa:
//           "Pedido para ser utilizado os m ateriais na serralheira, em todo o tem que quiser fazer algum mível para ser utilizado na UNISUAM.",
//         data_abertura: "13/11/2025",
//         status: "PEND_COT",
//         itens: [
//           {
//             id: "20",
//             codigo: "50.56.00028",
//             descricao: "LAMPADA FLUORESCENTE TUBULAR 40W",
//             quantidade: 25,
//             centro_custo: {
//               id: 1,
//               codigo: "01.004.008.02",
//               nome: "Facilities",
//             },
//             conta_contabil: {
//               id: 1,
//               codigo: "1321305",
//               nome: "Obras",
//             },
//           },
//         ],
//       },
//     ],
//   });

export function ProjectInfo() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    async function getProject() {
      try {
        const projectInfo = await ProjectRepository.getProjectById(projectId);
        console.log(projectInfo);
        setProject(projectInfo);
      } catch (e) {
        console.log(e);
      }
    }
    getProject();
  }, []);

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
            onClick={() => navigate("#orcamento")}
            value="orcamento"
            color={"white"}
          >
            <LuFolder />
            Orçamento
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => navigate("#requisicoes")}
            value="requisicoes"
            color={"white"}
          >
            <LuSquareCheck />
            Requisições
          </Tabs.Trigger>
          <Tabs.Indicator rounded="l2" bg="blue.600" />
        </Tabs.List>
        {project ? (
          <>
            <Tabs.Content value="informacoes" p="6">
              <DataList.Root orientation="horizontal" size="md">
                <DataList.Item variant="bold">
                  <DataList.ItemLabel>Código</DataList.ItemLabel>
                  <DataList.ItemValue>{project.code}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item variant="bold">
                  <DataList.ItemLabel>Nome</DataList.ItemLabel>
                  <DataList.ItemValue>{project.name}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item variant="bold">
                  <DataList.ItemLabel>Unidade</DataList.ItemLabel>
                  <DataList.ItemValue>{project.unit}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item variant="bold">
                  <DataList.ItemLabel>Data cadastrado</DataList.ItemLabel>
                  <DataList.ItemValue>{project.date_open}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item variant="bold">
                  <DataList.ItemLabel>Status</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <Badge
                      colorPalette={badgeStatus[project.status]}
                      py="1"
                      px="2"
                    >
                      {project.status}
                    </Badge>
                  </DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
            </Tabs.Content>

            <Tabs.Content value="orcamento" p="6">
              <DataList.Root orientation="horizontal" size="lg" pb="5" px="10">
                <DataList.Item>
                  <DataList.ItemLabel color="black" fontWeight="medium">
                    Valor total
                  </DataList.ItemLabel>
                  <DataList.ItemValue color="black" fontWeight="bolder">
                    <FormatNumber
                      value={Object.entries(project.budget).reduce(
                        (acc, [key, value]) => {
                          return acc + Number(value);
                        },
                        0
                      )}
                      style="currency"
                      currency="BRL"
                    />
                  </DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>

              <Table.Root size="sm" variant="outline" width="320px">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader px="4">MÊS</Table.ColumnHeader>
                    <Table.ColumnHeader>VALOR</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {Object.entries(project.budget).map(
                    ([budgetKey, budgetValue]) => {
                      return (
                        <Table.Row key={budgetKey}>
                          <Table.Cell px="4">{budgetKey}</Table.Cell>
                          <Table.Cell>
                            <FormatNumber
                              value={budgetValue}
                              style="currency"
                              currency="BRL"
                            />
                          </Table.Cell>
                        </Table.Row>
                      );
                    }
                  )}
                </Table.Body>
              </Table.Root>
            </Tabs.Content>

            <Tabs.Content value="requisicoes" p="6">
              {project.requisitions.length ? (
                project.requisitions.map((requisition) => {
                  return (
                    <Stack key={requisition.id}>
                      <Card.Root
                        size="sm"
                        borderWidth="1px"
                        onClick={() =>
                          navigate(`/requisicoes/${requisition.requisition}`)
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
                                colorPalette={badgeStatus[requisition.status]}
                                mr="4"
                                p="4"
                              >
                                {requisition.status}
                              </Badge>
                            </Text>

                            <Box>
                              <Text
                                size="md"
                                fontWeight="semibold"
                                color="black"
                              >
                                REQ {requisition.requisition} -{" "}
                                {requisition.name}
                              </Text>
                              <Text size="md">
                                Justificativa: {requisition.justification}
                              </Text>
                            </Box>
                          </Flex>
                        </Card.Body>
                      </Card.Root>
                    </Stack>
                  );
                })
              ) : (
                <Center color="blue.700">Não há requisições nesse projeto.</Center>
              )}
            </Tabs.Content>
          </>
        ) : (
          <VStack colorPalette="blue" p="10">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">Carregando...</Text>
          </VStack>
        )}
      </Tabs.Root>
    </Box>
  );
}
