import "./styles.css";
import { Button } from "antd";
import { useEffect, useState } from "react";

import { FolderTree } from "./components/FolderTree";
import { sourceApi } from "./api/source";
import { processFiles, processFolders, RecursiveFolderTree } from "./components/FolderTree.types";

export default function App() {
  const [foldersList, setFoldersList] = useState<RecursiveFolderTree>([]);
  const [toggleAllState, setToggleAllState] = useState<boolean|null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      return await sourceApi.getFolders()
    }
    const fetchFiles = async () => {
      return await sourceApi.getFiles();
    }

    Promise.all([fetchFolders(), fetchFiles()]).then(([folders, files]) => {
      const processedFolders = processFolders(folders);
      processFiles(processedFolders, files);
      setFoldersList(processedFolders)
    });
  }, []);

  const toggleAll = () => {
    const state = toggleAllState === null? true : !toggleAllState;
    setToggleAllState(state);
  };

  const resetTogglaAll = () => {
    setToggleAllState(null);
  }
  
  return (
    <div className="App">
      <Button>ANTD </Button>
      <tr />
      <button 
        onClick={toggleAll} 
        className={toggleAllState !== null ? "" : "inactive"}
      >
        Toggle All {toggleAllState ? "▼" : "▶"}
      </button>
      <FolderTree folders={foldersList} onToggleReset={resetTogglaAll} toggleAllState={toggleAllState} className="folder-tree" />
    </div>
  );
}
