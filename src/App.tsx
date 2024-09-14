import { useEffect, useState } from "react";
import { Button, Layout, Skeleton  } from "antd";
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

import { FolderTree } from "./components/FolderTree/FolderTree";
import { sourceApi } from "./api/source";
import { processFiles, processFolders, RecursiveFolderTree } from "./components/FolderTree/FolderTree.types";

import "./styles.css";

export default function App() {
  const [foldersList, setFoldersList] = useState<RecursiveFolderTree>([]);
  const [toggleAllState, setToggleAllState] = useState<boolean|null>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
      <Layout style={{ minWidth: '320px', width: 'fit-content', margin: '0 auto', padding: 24 }}>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <div className="logo" />
          <Button
            disabled={loading} 
            onClick={toggleAll} 
            className={toggleAllState !== null ? "" : "inactive"}
            icon={toggleAllState !== null ? <CaretDownOutlined /> : <CaretRightOutlined />}
          >
            Toggle All
          </Button>
        </Layout.Header>
        <Layout.Content>
          <div style={{ background: '#fff', minHeight: 280, padding: '0 20px' }}>
            {loading ? (
              <Skeleton active />
            ) : (
              <FolderTree folders={foldersList} onToggleReset={resetTogglaAll} toggleAllState={toggleAllState} className="folder-tree" />
            )}
          </div>
        </Layout.Content>
      </Layout>      
    </div>
  );
}
