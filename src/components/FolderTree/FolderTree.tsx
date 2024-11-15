import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

import { File } from "../File/File";
import { FileDto } from "../../api/file";
import { SearchFilterValue } from "../SearchFilter/SearchFilter";

import { RecursiveFolderTree } from "./FolderTree.types";
import "./FolderTree.styles.css";

export interface TreeProps {
  folders: RecursiveFolderTree;
  filterFn: (file: FileDto, index: number, array: FileDto[]) => boolean;
  className?: string;
  toggleAllState?: boolean | null;
  onToggleReset: () => void;
}

export const FolderTree: React.FC<TreeProps> = ({ folders, filterFn, className, toggleAllState = null, onToggleReset }) => {
  const [expanded, setExpanded] = useState<Array<boolean>>(folders.map(() => false));

  useEffect(() => {
    setExpanded(folders.map(() => false));
  }, [folders]);

  useEffect(() => {
    if (toggleAllState !== null) {
      setExpanded((prev) => {
        const copy = [...prev.map(() => toggleAllState)];
        return copy;
      });
    }
  }, [toggleAllState]);

  const toggle = (index: number) => {
    onToggleReset();
    setExpanded((prev) => {
      const copy = [...prev];
      copy[index] = !prev[index];
      return copy;
    });
  };

  return (
    <>
      <ul className={className}>
        {folders.map((folder, index) => (
          <li key={folder.id}>
            <Button onClick={() => toggle(index)} icon={expanded[index] ? <CaretDownOutlined /> : <CaretRightOutlined />} />
            {folder.name}
            {(expanded[index] && folder.folders.length > 0) && (
              <FolderTree folders={folder.folders} filterFn={filterFn} toggleAllState={toggleAllState} onToggleReset={onToggleReset} />
            )}
            {(expanded[index] && folder.files.length > 0) && (
              <ul>{folder.files.filter(filterFn).map((file) => <li key={file.id}><File file={file} /></li>)}</ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
