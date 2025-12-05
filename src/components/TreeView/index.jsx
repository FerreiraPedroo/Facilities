import {
  Highlight,
  Input,
  Stack,
  TreeView,
  createTreeCollection,
  useFilter,
  useTreeView,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronRight, LuFile, LuFolder } from "react-icons/lu";

export const TreeViewComponent = () => {
  const [collection, setCollection] = useState(initialCollection);
  const [expanded, setExpanded] = useState([]);
  const [query, setQuery] = useState("");
  const store = useTreeView({
    collection,
    defaultExpandedValue: [],
  });

  const { contains } = useFilter({ sensitivity: "base" });

  const search = (search) => {
    setQuery(search);
    const nextCollection = initialCollection.filter((node) =>
      contains(node.name, search)
    );

    // update collection
    setCollection(nextCollection);

    // expand all branches
    setExpanded(nextCollection.getBranchValues());
  };

  return (
    <Stack gap="3">
      <Input
        size="sm"
        placeholder="Search for files: 'react'"
        onChange={(e) => search(e.target.value)}
      />

      <TreeView.RootProvider
        collection={collection}
        expandedValue={expanded}
        onExpandedChange={(details) => setExpanded(details.expandedValue)}
        value={store}
      >
        {/* <pre>{JSON.stringify(store.expandedValue)}</pre> */}
        <TreeView.Label srOnly>Tree</TreeView.Label>
        <TreeView.Tree>
          <TreeView.Node
            indentGuide={<TreeView.BranchIndentGuide />}
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <LuFolder />
                  <TreeView.BranchText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: "gray.emphasized" }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.BranchText>
                  <TreeView.BranchIndicator>
                    <LuChevronRight />
                  </TreeView.BranchIndicator>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <LuFile />
                  <TreeView.ItemText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: "gray.emphasized" }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.ItemText>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.RootProvider>
    </Stack>
  );
};

const initialCollection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "eletrico",
        name: "Elétrico",
        children: [
          { id: "lampada", name: "Lâmpada" },
          { id: "reator", name: "Reator" },
        ],
      },
      {
        id: "civil",
        name: "Civil",
        children: [
          { id: "tinta", name: "Tinta" },
          { id: "massa_corrida", name: "Massa corrida" },
        ],
      },
    ],
  },
});
