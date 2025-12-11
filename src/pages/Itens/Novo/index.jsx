import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
// import { badgeStatus } from "../../../utils/badge";
import {
  Badge,
  Box,
  Button,
  Checkbox,
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
import { toaster } from "@/components/ui/toaster";

const itemDefault = {
  code: null,
  name: null,
  category_id: null,
  sub_category_id: null,
  status: true,
};

export function ItemNovo() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState(itemDefault);

  const handleSaveItem = useCallback(async () => {
    const id = "save-save";

    try {
      if (!toaster.isVisible(id)) {
        toaster.loading({
          id,
          title: "Salvando item...",
          description: "",
        });
      }

      await ItemRepository.saveItem(item);

      setItem(itemDefault);

      toaster.update(id, {
        title: "Item salvo...",
        description: "",
        type: "success",
        duration: 2000,
      });
    } catch (e) {
      toaster.update(id, {
        title: "Erro ao salvar o item",
        description: e.message ?? "",
        type: "error",
        duration: 2000,
      });
    }
  });

  const handleValue = useCallback((e, name) => {
    setItem((prev) => {
      const newItem = { ...prev };
      
      if (name == "status") {
        newItem[name] = e.checked ? "Ativo" : "Inativo";
      } else {
        newItem[e.target.name] = e.target.value;
      }
      
      console.log(newItem)
      return newItem;
    });
  }, []);

  useEffect(() => {
    async function getCategoriesAndSub() {
      const result = await CategoryRepository.getAllCategoriesAndSub();
      setCategories(result);
    }
    getCategoriesAndSub();
  }, []);

  // console.log(item)

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

          <Tabs.Indicator rounded="l2" bg="blue.600" />

          <Flex ml="6" gap="6">
            <Separator
              size="lg"
              orientation="vertical"
              colorPalette={"red"}
            ></Separator>

            <Button
              variant={"surface"}
              _hover={{ bg: "blue.muted", color: "fg" }}
              onClick={handleSaveItem}
            >
              Salvar
            </Button>
          </Flex>
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

            <Checkbox.Root
              colorPalette="green"
              size="lg"
              py="4"
              checked={item.status == "Ativo" ? true : false}
              onCheckedChange={(e) => handleValue(e, "status")}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control cursor="pointer" />
              <Checkbox.Label>Ativo</Checkbox.Label>
            </Checkbox.Root>
          </Stack>
        </Tabs.Content>

        <Tabs.Content value="budget" p="6"></Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
