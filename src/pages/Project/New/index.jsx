import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  DataList,
  Field,
  Flex,
  For,
  FormatNumber,
  Input,
  NativeSelect,
  NumberInput,
  Select,
  Separator,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { LuFolder, LuUser } from "react-icons/lu";
import { ProjectRepository } from "@/repositories/project.repository";

import unidades from "../../../database/unidades.json";

import "./styles.css";
import { UnitRepository } from "@/repositories/unit.repository";

const tabPosition = {
  informacoes: 0,
  orcamento: 1,
};

export function ProjectNew() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [projeto, setProjeto] = useState({
    code: "",
    name: "",
    period: "",
    classificacao: "",
    unit_id: "",
    status: "",
    date_open: new Date().toISOString(),
    budget: {
      janeiro: "",
      fevereiro: "",
      marco: "",
      abril: "",
      maio: "",
      junho: "",
      julho: "",
      agosto: "",
      setembro: "",
      outubro: "",
      novembro: "",
      dezembro: "",
    },
  });

  const handleValue = useCallback((e, name) => {
    console.log(e, name);
    if (
      [
        "janeiro",
        "fevereiro",
        "marco",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ].find((e) => e == name)
    ) {
      setProjeto((prev) => {
        const novo = { ...prev };
        novo.budget[name] = e.valueAsNumber || 0;
        return novo;
      });
    } else {
      setProjeto((prev) => {
        const novo = { ...prev };
        novo[e.target.name] = e.target.value;
        return novo;
      });
    }
  }, []);

  const handleModal = () => {
    const item = Object.entries({ ...projeto }).reduce((acc, [key, value]) => {
      if (value instanceof Object) {
        if (!Object.entries({ ...value }).find(([, v]) => v)) {
          acc.push(
            key.charAt(0).toUpperCase() +
              key.slice(1) +
              " - é necessário pelo menos um mês de orçamento."
          );
        }
      } else if (!value) {
        acc.push(key.charAt(0).toUpperCase() + key.slice(1));
      }
      return acc;
    }, []);
    setFormError(item);
  };

  const handleNewProject = async () => {
    try {
      await ProjectRepository.saveProject({ ...projeto });
      setProjeto({
        code: "",
        name: "",
        period: "",
        classificacao: "",
        unit_id: "",
        status: "",
        date_open: new Date().toISOString(),
        budget: {
          janeiro: "",
          fevereiro: "",
          marco: "",
          abril: "",
          maio: "",
          junho: "",
          julho: "",
          agosto: "",
          setembro: "",
          outubro: "",
          novembro: "",
          dezembro: "",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

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
    async function getUnitList() {
      const unitList = await UnitRepository.getUnitList();
      setUnitList(unitList);
    }
    getUnitList()
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
          <Tabs.Indicator rounded="l2" bg="blue.600" />

          <Separator
            ml="6"
            size="lg"
            orientation="vertical"
            colorPalette={"red"}
          ></Separator>
          <Button
            ml="6"
            variant={"surface"}
            colorPalette={"gray"}
            onClick={handleNewProject}
          >
            Salvar
          </Button>
          <Button
            ml="6"
            variant={"surface"}
            colorPalette={"gray"}
            onClick={handleImportProject}
          >
            Importar
          </Button>
        </Tabs.List>

        <Tabs.Content value="informacoes" p="6">
          <Stack gap="3" maxW="lg" css={{ "--field-label-width": "128px" }}>
            <Field.Root orientation="vertical" required>
              <Field.Label>Código</Field.Label>
              <Input
                name="code"
                defaultValue={projeto.code}
                onChange={(e) => handleValue(e)}
              />
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Nome</Field.Label>
              <Input
                name="name"
                defaultValue={projeto.name}
                onChange={(e) => handleValue(e)}
              />
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Unidade</Field.Label>
              <NativeSelect.Root width="100%">
                <NativeSelect.Field
                  placeholder="Selecione uma opção"
                  name="unit"
                  defaultValue={projeto.unit}
                  onChange={(e) => handleValue(e)}
                >
                  <For each={unitList}>
                    {(unit) => {
                      return (
                        <option key={unit.id} value={unit.id}>
                          {unit.alias}
                        </option>
                      );
                    }}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Classificação</Field.Label>
              <NativeSelect.Root width="100%">
                <NativeSelect.Field
                  placeholder="Selecione uma opção"
                  name="classification"
                  defaultValue={projeto.classification}
                  onChange={(e) => handleValue(e)}
                >
                  <For each={["CAPEX", "OPEX"]}>
                    {(classif) => {
                      return (
                        <option key={classif} value={classif}>
                          {classif}
                        </option>
                      );
                    }}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Switch.Root colorPalette="green" size="lg" py="4" defaultChecked>
              <Switch.HiddenInput />
              <Switch.Label>Ativo</Switch.Label>
              <Switch.Control></Switch.Control>
            </Switch.Root>
          </Stack>
        </Tabs.Content>

        <Tabs.Content value="orcamento" p="6">
          <DataList.Root orientation="horizontal" size="lg" pb="5" px="10">
            <DataList.Item>
              <DataList.ItemLabel color="black" fontSize="lg">
                Valor total
              </DataList.ItemLabel>
              <DataList.ItemValue color="black" fontSize="lg">
                {projeto?.budget && (
                  <FormatNumber
                    value={Object.entries(projeto.budget).reduce(
                      (acc, [key, cur]) => {
                        return acc + Number(cur);
                      },
                      0
                    )}
                    style="currency"
                    currency="BRL"
                    fontSize="lg"
                  />
                )}
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
              <Table.Row key={"janeiro"}>
                <Table.Cell px="4">JANEIRO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.janeiro) : ""}
                    onValueChange={(e) => handleValue(e, "janeiro")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"janeiro"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"fevereiro"}>
                <Table.Cell px="4">FEVEREIRO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={
                      projeto.budget ? String(projeto.budget.fevereiro) : ""
                    }
                    onValueChange={(e) => handleValue(e, "fevereiro")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"fevereiro"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"marco"}>
                <Table.Cell px="4">MARÇO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.marco) : ""}
                    onValueChange={(e) => handleValue(e, "marco")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"marco"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"abril"}>
                <Table.Cell px="4">ABRIL</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.abril) : ""}
                    onValueChange={(e) => handleValue(e, "abril")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"abril"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"maio"}>
                <Table.Cell px="4">MAIO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.maio) : ""}
                    onValueChange={(e) => handleValue(e, "maio")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"maio"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"junho"}>
                <Table.Cell px="4">JUNHO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.junho) : ""}
                    onValueChange={(e) => handleValue(e, "junho")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"junho"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"julho"}>
                <Table.Cell px="4">JULHO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.julho) : ""}
                    onValueChange={(e) => handleValue(e, "julho")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"julho"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"agosto"}>
                <Table.Cell px="4">AGOSTO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.agosto) : ""}
                    onValueChange={(e) => handleValue(e, "agosto")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"agosto"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"setembro"}>
                <Table.Cell px="4">SETEMBRO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={
                      projeto.budget ? String(projeto.budget.setembro) : ""
                    }
                    onValueChange={(e) => handleValue(e, "setembro")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"setembro"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"outubro"}>
                <Table.Cell px="4">OUTUBRO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={projeto.budget ? String(projeto.budget.outubro) : ""}
                    onValueChange={(e) => handleValue(e, "outubro")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"outubro"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"novembro"}>
                <Table.Cell px="4">NOVEMBRO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={
                      projeto.budget ? String(projeto.budget.novembro) : ""
                    }
                    onValueChange={(e) => handleValue(e, "novembro")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"novembro"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
              <Table.Row key={"dezembro"}>
                <Table.Cell px="4">DEZEMBRO</Table.Cell>
                <Table.Cell p="0">
                  <NumberInput.Root
                    value={
                      projeto.budget ? String(projeto.budget.dezembro) : ""
                    }
                    onValueChange={(e) => handleValue(e, "dezembro")}
                    formatOptions={{
                      style: "currency",
                      currency: "BRL",
                    }}
                  >
                    <NumberInput.Input
                      name={"dezembro"}
                      placeholder="R$"
                      border="0"
                      borderRadius="0"
                      py="0"
                    />
                  </NumberInput.Root>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

{
  /* <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your application has been received. We will review your
              application and respond within the next 48 hours.
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => null}
          />
        </Alert> */
}
