import React, { useEffect, useState } from "react";
import { sourceApi } from "../api/source";

export interface TreeProps {

}

export const FolderTree = React.FC<TreeProps>(props) => {
  const [foldersList, setFoldersList] = useState([]);

  useEffect(() => {
    setFoldersList(sourceApi.getFolders());
  }, []);
  return (
    <ul>
      {foldersList.map()}
      <button>+</button>
    </ul>
  );
};
