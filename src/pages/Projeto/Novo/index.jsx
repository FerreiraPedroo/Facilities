import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import unidades from "../../../database/unidades.json";

import "./styles.css";

import { LuFolder, LuUser } from "react-icons/lu";
import { bancoDeDados } from "@/repositories/projeto.repository";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
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
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
} from "@chakra-ui/react";

const tabPosition = {
  informacoes: 0,
  orcamento: 1,
};

export function ProjetoNovo() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState([]);

  const [projeto, setProjeto] = useState({
    codigo: "",
    periodo: "",
    nome: "",
    unidade_id: "",
    classificacao: "",
    status: "",
    data_abertura: new Date().toISOString(),
    orcamento: {
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
        novo.orcamento[name] = e.valueAsNumber || 0;
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

  const handleNovoForm = () => {
    bancoDeDados.adicionarProjeto({ ...projeto });

    setProjeto({
      codigo: "",
      periodo: "",
      nome: "",
      unidade_id: "",
      classificacao: "",
      status: "",
      data_abertura: new Date().toISOString(),
      orcamento: {
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
  };

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
        </Tabs.List>

        <Tabs.Content value="informacoes" p="6">
          <Stack gap="3" maxW="lg" css={{ "--field-label-width": "128px" }}>
            <Field.Root orientation="vertical" required>
              <Field.Label>Código</Field.Label>
              <Input
                name="codigo"
                defaultValue={projeto.codigo}
                onChange={(e) => handleValue(e)}
              />
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Nome</Field.Label>
              <Input
                name="nome"
                defaultValue={projeto.nome}
                onChange={(e) => handleValue(e)}
              />
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Unidade</Field.Label>
              <NativeSelect.Root width="100%">
                <NativeSelect.Field
                  placeholder="Selecione uma opção"
                  name="unidade"
                  defaultValue={projeto.unidade}
                  onChange={(e) => handleValue(e)}
                >
                  <For each={unidades}>
                    {(unidade) => {
                      return (
                        <option key={unidade.id} value={unidade.id}>
                          {unidade.sigla}
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
                  name="classificacao"
                  defaultValue={projeto.classificacao}
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
                <FormatNumber
                  value={Object.entries(projeto.orcamento).reduce(
                    (acc, [key, cur]) => {
                      return acc + cur;
                    },
                    0
                  )}
                  style="currency"
                  currency="BRL"
                  fontSize="lg"
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
              <For
                each={[
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
                ]}
              >
                {(value) => (
                  <Table.Row key={value}>
                    <Table.Cell px="4">{value.toUpperCase()}</Table.Cell>
                    <Table.Cell p="0">
                      <NumberInput.Root
                        defaultValue={projeto.orcamento[value]}
                        onValueChange={(e) => handleValue(e, value)}
                        formatOptions={{
                          style: "currency",
                          currency: "BRL",
                        }}
                      >
                        <NumberInput.Input
                          name={value}
                          placeholder="R$"
                          border="0"
                          borderRadius="0"
                          py="0"
                        />
                      </NumberInput.Root>
                    </Table.Cell>
                  </Table.Row>
                )}
              </For>
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
