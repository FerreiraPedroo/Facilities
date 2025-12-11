import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

import { badgeStatus } from "@/utils/badge";
import { ProjectRepository } from "@/repositories/project.repository";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Table,
} from "@chakra-ui/react";

export function ProjectList() {
  const navigate = useNavigate();

  const [projetoLista, setProjetoLista] = useState(null);

  const handleImportProject = async () => {
    // await ProjectRepository.saveProject({ ...projeto });
    // setProjeto({
    //   code: "",
    //   name: "",
    //   period: "",
    //   classificacao: "",
    //   unit_id: "",
    //   status: "",
    //   date_open: new Date().toISOString(),
    //   budget: {
    //     janeiro: "",
    //     fevereiro: "",
    //     marco: "",
    //     abril: "",
    //     maio: "",
    //     junho: "",
    //     julho: "",
    //     agosto: "",
    //     setembro: "",
    //     outubro: "",
    //     novembro: "",
    //     dezembro: "",
    //   },
    // });
  };

  useEffect(() => {
    async function dados() {
      const projetos = await ProjectRepository.getProjects();
      console.log(projetos);
      setProjetoLista(projetos);
    }
    dados();
  }, []);

  // console.log(projetoLista);

  return (
    <Container padding={0}>
      <Flex h="64px" bg="blue.800" py="3" px="6" width="100%" gap="6">
        <Button
          variant="surface"
          _hover={{ bg: "blue.muted", color: "fg" }}
          onClick={() => navigate("/projetos/novo")}
        >
          Novo projeto
        </Button>
        <Button
          variant="surface"
          _hover={{ bg: "blue.muted", color: "fg" }}
          onClick={handleImportProject}
        >
          Importar projeto
        </Button>
      </Flex>

      <Box paddingY="6" paddingX="4">
        {projetoLista?.length ? (
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
                  width={"160px"}
                  textAlign={"center"}
                  userSelect={"none"}
                >
                  CÓDIGO
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"} userSelect={"none"}>
                  NOME
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width={"160px"}
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
                  width={"96px"}
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
                  <Table.Cell textAlign={"center"}>{projeto.code}</Table.Cell>
                  <Table.Cell>{projeto.name}</Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    {projeto.unit?.name}
                  </Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    {projeto.classification}
                  </Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    <Badge
                      colorPalette={badgeStatus[projeto.status]}
                      py="2"
                      px="4"
                    >
                      {projeto.status}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        ) : (
          <Center>Nenhum projeto cadastrado</Center>
        )}
      </Box>
    </Container>
  );
}
