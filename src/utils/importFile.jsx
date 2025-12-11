"use client";

import {
  Box,
  Button,
  CloseButton,
  Dialog,
  FileUpload,
  Icon,
  Portal,
  useFileUpload,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import Papa from "papaparse";

export function ImportFile({ textButton, callBack }) {
  const [open, setOpen] = useState(false);

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 510000,
  });

  useEffect(() => {
    console.log(fileUpload);
    async function parseFile() {
      if (fileUpload.acceptedFiles.length) {
        console.log();
        const parsed = await Papa.parse(fileUpload.acceptedFiles[0], {
          header: true,
          skipEmptyLines: true,
          // dynamicTyping: true, // Converte tipos de dados automaticamente (números, booleanos)
          complete: function (results) {
            console.log("Dados do arquivo:", results.data);
            console.log("Erros:", results.errors);
            console.log("Metadados:", results.meta);
          },
        });
        console.log(parsed);
      }
    }
    parseFile();
  }, [fileUpload]);

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
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
              {fileUpload.acceptedFiles.length ? (
                <></>
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
              <Button onClick={callBack}>Salvar</Button>
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
