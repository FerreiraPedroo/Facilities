import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
// import { badgeStatus } from "../../../utils/badge";
import {
  Badge,
  Box,
  Button,
  Container,
  DataList,
  Field,
  Flex,
  For,
  FormatNumber,
  Group,
  Input,
  NativeSelect,
  NumberInput,
  Stack,
  Switch,
  Table,
  Tabs,
} from "@chakra-ui/react";
import { badgeStatus } from "../../../utils/badge";
import { TreeViewComponent } from "../../../components/TreeView";
import { LuFolder, LuUser } from "react-icons/lu";

export function ItemNovo() {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    codigo: "50.56.00028",
    descricao: "LAMPADA FLUORESCENTE TUBULAR 40W",
    categoria: null,
    sub_categoria: null,
    status: "Ativo",
  });

  const [categorias, setCategorias] = useState([
    {
      id: 1,
      nome: "Elétrico",
      sub_categorias: [{ id: 1, nome: "Lâmpada", value: "lampada" }],
    },
  ]);

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
      setItem((prev) => {
        const novo = { ...prev };
        novo.orcamento[name] = e.valueAsNumber || 0;
        return novo;
      });
    } else {
      setItem((prev) => {
        const novo = { ...prev };
        novo[e.target.name] = e.target.value;
        return novo;
      });
    }
  }, []);

  return (
    <Container padding={0}>
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

          {/* <Tabs.Trigger
            onClick={() => navigate("#orcamento")}
            value="orcamento"
            color={"white"}
          >
            <LuFolder />
            Orçamento
          </Tabs.Trigger> */}

          <Tabs.Indicator rounded="l2" bg="blue.600" />
        </Tabs.List>

        <Tabs.Content value="informacoes" p="6">
          <Stack gap="3" maxW="lg" css={{ "--field-label-width": "128px" }}>
            <Field.Root orientation="vertical" required>
              <Field.Label>Código</Field.Label>
              <Input
                name="codigo"
                defaultValue={item.codigo}
                onChange={(e) => handleValue(e)}
              />
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Descricao</Field.Label>
              <Input
                name="descricao"
                defaultValue={item.descricao}
                onChange={(e) => handleValue(e)}
              />
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Categoria</Field.Label>
              <NativeSelect.Root width="100%">
                <NativeSelect.Field
                  placeholder="Selecione uma opção"
                  name="categoria"
                  defaultValue={item.categoria}
                  onChange={(e) => handleValue(e)}
                >
                  <For each={categorias}>
                    {(categoria) => {
                      return (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </option>
                      );
                    }}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Sub categoria</Field.Label>
              <NativeSelect.Root width="100%">
                <NativeSelect.Field
                  placeholder="Selecione uma opção"
                  name="sub_categoria"
                  defaultValue={item.sub_categoria}
                  onChange={(e) => handleValue(e)}
                >
                  <For
                    each={
                      categorias.find((cat) => cat.id == item.categoria)
                        ?.sub_categorias
                    }
                  >
                    {(subCat) => {
                      if (!item.categoria) {
                        return null;
                      }
                      return (
                        <option key={subCat.id} value={subCat.id}>
                          {subCat.nome}
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

        <Tabs.Content value="orcamento" p="6"></Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
