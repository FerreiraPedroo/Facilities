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
  HStack,
  Input,
  NativeSelect,
  NumberInput,
  RadioCard,
  Select,
  Separator,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { LuFolder, LuUser } from "react-icons/lu";
import { ProjectRepository } from "@/repositories/project.repository";

import unidades from "../../../database/unidades.json";

import "./styles.css";
import { UnitRepository } from "@/repositories/unit.repository";
import { projectValidator } from "@/types/interfaces/Project/project.interface";

const tabPosition = {
  informacoes: 0,
  orcamento: 1,
};

export function ProjectNew() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [projetoErrors, setProjetoErrors] = useState({});
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch());
  console.log(watch("status"));

  const onSubmit = (data) => console.log(data);

  const handleNewProject = async () => {
    try {
      console.log(projeto);
      const projectValidated = await projectValidator.parse(projeto);
      console.log(projectValidated);
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
    } catch (e) {
      console.log(JSON.parse(e));
    }
  };
  useEffect(() => {
    async function getUnitList() {
      const unitList = await UnitRepository.getUnitList();
      setUnitList(unitList);
    }
    getUnitList();
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
        </Tabs.List>

        <Tabs.Content value="informacoes" p="6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="3" maxW="lg">
              <Field.Root orientation="horizontal" required>
                <Field.Label>Código</Field.Label>
                <Input name="code" {...register("code")} />
              </Field.Root>

              <Field.Root orientation="horizontal" required>
                <Field.Label>Nome</Field.Label>
                <Input name="name" {...register("name")} />
                <Field.ErrorText>This is an error text</Field.ErrorText>
              </Field.Root>

              <Field.Root orientation="horizontal" required>
                <Field.Label>Unidade</Field.Label>
                <NativeSelect.Root width="100%">
                  <NativeSelect.Field
                    placeholder="Selecione uma opção"
                    name="unit"
                    {...register("unit")}
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

              <RadioCard.Root
                orientation="horizontal"
                align="center"
                maxW="400px"
                name="classification"
                colorPalette={"green"}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                gap="4"
                defaultValue={"CAPEX"}
              >
                <RadioCard.Label>Classificação</RadioCard.Label>
                <HStack width={"200px"}>
                  <RadioCard.Item value="CAPEX">
                    <RadioCard.ItemHiddenInput
                      {...register("classification", {
                        required: true,
                      })}
                    />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText>CAPEX</RadioCard.ItemText>
                    </RadioCard.ItemControl>
                  </RadioCard.Item>

                  <RadioCard.Item value="OPEX">
                    <RadioCard.ItemHiddenInput
                      {...register("classification")}
                    />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText>OPEX</RadioCard.ItemText>
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                </HStack>
              </RadioCard.Root>

              <RadioCard.Root
                orientation="horizontal"
                align="center"
                maxW="400px"
                name="status"
                colorPalette={"green"}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                gap="4"
                defaultValue={"Ativo"}
              >
                <RadioCard.Label>Classificação</RadioCard.Label>
                <HStack width={"200px"}>
                  <RadioCard.Item value="Ativo">
                    <RadioCard.ItemHiddenInput
                      {...register("status", {
                        required: true,
                      })}
                    />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText>Ativo</RadioCard.ItemText>
                    </RadioCard.ItemControl>
                  </RadioCard.Item>

                  <RadioCard.Item value="Inativo">
                    <RadioCard.ItemHiddenInput {...register("status")} />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText>Inativo</RadioCard.ItemText>
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                </HStack>
              </RadioCard.Root>
            </Stack>
          </form>
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
                    value={0}
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
                  <NumberInput.Root {...register("budget.janeiro")}>
                    <NumberInput.Input
                      name={"budget.janeiro"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.fevereiro")}>
                    <NumberInput.Input
                      name={"budget.fevereiro"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.marco")}>
                    <NumberInput.Input
                      name={"budget.marco"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.abril")}>
                    <NumberInput.Input
                      name={"budget.abril"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.maio")}>
                    <NumberInput.Input
                      name={"budget.maio"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.junho")}>
                    <NumberInput.Input
                      name={"budget.junho"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.julho")}>
                    <NumberInput.Input
                      name={"budget.julho"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.agosto")}>
                    <NumberInput.Input
                      name={"budget.agosto"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.setembro")}>
                    <NumberInput.Input
                      name={"budget.setembro"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.outubro")}>
                    <NumberInput.Input
                      name={"budget.outubro"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.novembro")}>
                    <NumberInput.Input
                      name={"budget.novembro"}
                      placeholder="0"
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
                  <NumberInput.Root {...register("budget.dezembro")}>
                    <NumberInput.Input
                      name={"budget.dezembro"}
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
