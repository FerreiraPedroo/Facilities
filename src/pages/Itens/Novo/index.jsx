import { useCallback, useEffect, useState } from "react";
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
  Separator,
  Stack,
  Switch,
  Table,
  Tabs,
} from "@chakra-ui/react";
import { badgeStatus } from "@utils/badge";
import { TreeViewComponent } from "@components/TreeView";

import { ItemRepository } from "@/repositories/itens.repository";
import { CategoryRepository } from "@/repositories/category.repository";

import { LuFolder, LuUser } from "react-icons/lu";

export function ItemNovo() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({});

  const handleImportItem = useCallback(async () => {
    try {
      await db.saveItem({ ...item });
    } catch (e) {
      console.log({ e });
    }
  });
  const handleSaveItem = useCallback(async () => {
    try {
      await db.saveItem(item);
    } catch (e) {
      console.log({ e });
    }
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
      setItem((prev) => {
        const newItem = { ...prev };
        newItem.budget[name] = e.valueAsNumber || 0;
        return newItem;
      });
    } else {
      setItem((prev) => {
        const newItem = { ...prev };
        newItem[e.target.name] = e.target.value;
        return newItem;
      });
    }
  }, []);

  useEffect(() => {
    async function getCategoriesAndSub() {
      const result = await CategoryRepository.getAllCategoriesAndSub();
      setCategories(result);
    }
    getCategoriesAndSub();
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
            onClick={() => navigate("#budget")}
            value="budget"
            color={"white"}
          >
            <LuFolder />
            Orçamento
          </Tabs.Trigger> */}

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
            onClick={handleSaveItem}
          >
            Salvar
          </Button>
          <Button
            ml="6"
            variant={"surface"}
            colorPalette={"gray"}
            onClick={handleImportItem}
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
                defaultValue={item.code}
                onChange={(e) => handleValue(e)}
              />
            </Field.Root>

            <Field.Root orientation="vertical" required>
              <Field.Label>Nome</Field.Label>
              <Input
                name="name"
                defaultValue={item.name}
                onChange={(e) => handleValue(e)}
              />
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>

            <Flex gap="4">
              <Field.Root orientation="vertical" required>
                <Field.Label>Categoria</Field.Label>
                <NativeSelect.Root width="100%">
                  <NativeSelect.Field
                    placeholder="Selecione uma opção"
                    name="category_id"
                    defaultValue={item.category_id}
                    onChange={(e) => handleValue(e)}
                  >
                    <For each={categories}>
                      {(category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
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
                    name="sub_category_id"
                    defaultValue={item.sub_category_id}
                    onChange={(e) => handleValue(e)}
                  >
                    <For
                      each={
                        categories.find((cat) => cat.id == item.category_id)
                          ?.sub_categories
                      }
                    >
                      {(subCat) => {
                        if (!item.category_id) {
                          return null;
                        }
                        return (
                          <option key={subCat.id} value={subCat.id}>
                            {subCat.name}
                          </option>
                        );
                      }}
                    </For>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
            </Flex>

            <Switch.Root colorPalette="green" size="lg" py="4" defaultChecked>
              <Switch.HiddenInput />
              <Switch.Label>Ativo</Switch.Label>
              <Switch.Control></Switch.Control>
            </Switch.Root>
          </Stack>
        </Tabs.Content>

        <Tabs.Content value="budget" p="6"></Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
