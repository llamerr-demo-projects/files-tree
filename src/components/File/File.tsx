import {
    FileTextOutlined,
    FilePdfOutlined,
  } from '@ant-design/icons';

import { FileDto } from "../../api/file";
import { FileType } from '../../api/fileType';

type FileTypeToIconMapping = {
    [key in FileType]: JSX.Element
}

type FileTypeToColorMapping = {
    [key in FileType]: string
}

const fileTypeToIcon: FileTypeToIconMapping = {
    [FileType.TXT]: <FileTextOutlined style={{ padding: '0 10px' }} />,
    [FileType.PDF]: <FilePdfOutlined style={{ padding: '0 10px' }} />,
}

const fileTypeToColor: FileTypeToColorMapping = {
    [FileType.TXT]: 'blue',
    [FileType.PDF]: 'red',
}

const FileTypeIcon: React.FC<{ type: FileType }> = ({ type }) => {
    return fileTypeToIcon[type];
}

export const File: React.FC<{ file: FileDto }> = ({ file }) => {
    return (
        <span style={{ color: fileTypeToColor[file.type] }}>
            <FileTypeIcon type={file.type} />
            {file.name}
        </span>
    );
}