"use client";

import {
  Box,
  Button,
  CloseButton,
  Dialog,
  FileUpload,
  Flex,
  Icon,
  Portal,
  Text,
  useFileUpload,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import Papa from "papaparse";

export function ImportFile({ textButton, callBackSaveItens }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const parserCounter = useRef({ parsed: 0, errors: 0 });
  const [parsedList, setParsedList] = useState([]);

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 510000,
  });

  useEffect(() => {
    if (fileUpload.acceptedFiles[0]) {
      const papaParsed = Papa.parse(fileUpload.acceptedFiles[0], {
        header: true,
        skipEmptyLines: true,
        step: async function (results, parser) {
          try {
            await callBackSaveItens(results.data);
            parserCounter.parsed++;
          } catch (e) {
            parserCounter.errors++;
          }
        },
        complete: function (results) {
          setParsedList(results.data);
          fileUpload.clearFiles();
        },
      });
    }
  }, [fileUpload]);

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => {
        setParsedList([]);
        setOpen(e.open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant={"surface"} _hover={{ bg: "blue.muted", color: "fg" }}>
          {textButton}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{textButton}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {parsedList.length ? (
                <Flex>
                  <Box>
                    <Text>Total de registros: {parserCounter.parsed}</Text>
                    <br />
                    <Text>Total de erros: {parserCounter.errors}</Text>
                  </Box>
                </Flex>
              ) : (
                <FileUpload.RootProvider
                  maxW="md"
                  alignItems="stretch"
                  // maxFiles={1}
                  cursor="pointer"
                  value={fileUpload}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                      <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                      <Box>
                        Clique para selecionar um arquivo <br /> ou <br />
                        Solte o arquivo aqui.
                      </Box>
                      <Box color="fg.muted">.csv</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List />
                </FileUpload.RootProvider>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => callBackSaveItens(parsedList)}>
                Salvar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
