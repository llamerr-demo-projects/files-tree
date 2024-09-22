import { useEffect, useState } from "react";
import { Button, Layout, Skeleton  } from "antd";
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

import { sourceApi } from "./api/source";
import { FileDto } from "./api/file";
import { FolderDto } from "./api/folder";
import { SearchFilter, SearchFilterValue } from "./components/SearchFilter/SearchFilter";
import { FolderTree } from "./components/FolderTree/FolderTree";
import { processFiles, processFolders, RecursiveFolderTree } from "./components/FolderTree/FolderTree.types";
import { ChatGPTGenerator } from "./components/ChatGPTGenerator/ChatGPTGenerator";

import "./styles.css";

const createFilesFilter = (filterValue: SearchFilterValue) => (file: FileDto, index: number, array: FileDto[]): boolean => {
  if (filterValue.value.length > 0 && !file.name.toLocaleLowerCase().includes(filterValue.value.trim().toLocaleLowerCase())) {
    return false;
  }
  if (filterValue.options.length > 0 && !filterValue.options.includes(file.type.toString())) {
    return false;
  }
  return true;
}

const processData = (data: {folders: Array<FolderDto>, files: Array<FileDto>}) => {
  const processedFolders = processFolders(data.folders);
  processFiles(processedFolders, data.files);
  return processedFolders;
}

export default function App() {
  const [foldersList, setFoldersList] = useState<RecursiveFolderTree>([]);
  const [toggleAllState, setToggleAllState] = useState<boolean|null>(null);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState<SearchFilterValue>({value: '', options: []});

  // fetch data
  useEffect(() => {
    const fetchFolders = async () => {
      return await sourceApi.getFolders()
    }
    const fetchFiles = async () => {
      return await sourceApi.getFiles();
    }

    Promise.all([fetchFolders(), fetchFiles()]).then(([folders, files]) => {
      setFoldersList(processData({folders, files}))
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
        <Layout.Header style={{ background: '#fff', padding: 0, display: 'flex', flexDirection: 'column', 'height': 'fit-content' }}>
          <ChatGPTGenerator onDataLoaded={(data) => setFoldersList(processData(data))} />
          <SearchFilter disabled={loading} onChange={(value) => setFilterValue(value)} />
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
          <div style={{ background: '#fff', minHeight: 280, padding: '20px' }}>
            {loading ? (
              <Skeleton active />
            ) : (
              <FolderTree folders={foldersList} filterFn={createFilesFilter(filterValue)} onToggleReset={resetTogglaAll} toggleAllState={toggleAllState} className="folder-tree" />
            )}
          </div>
        </Layout.Content>
      </Layout>      
    </div>
  );
}
