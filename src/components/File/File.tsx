import {
    FileTextOutlined,
    FilePdfOutlined,
    FileGifOutlined,
    FileJpgOutlined,
    FileExcelOutlined,
    FileWordOutlined,
    FileMarkdownOutlined,
    FilePptOutlined,
    FileZipOutlined,
    FileUnknownOutlined
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
    [FileType.GIF]: <FileGifOutlined style={{ padding: '0 10px' }} />,
    [FileType.JPG]: <FileJpgOutlined style={{ padding: '0 10px' }} />,
    [FileType.XLSX]: <FileExcelOutlined style={{ padding: '0 10px' }} />,
    [FileType.DOCX]: <FileWordOutlined style={{ padding: '0 10px' }} />,
    [FileType.MD]: <FileMarkdownOutlined style={{ padding: '0 10px' }} />,
    [FileType.PPT]: <FilePptOutlined style={{ padding: '0 10px' }} />,
    [FileType.ZIP]: <FileZipOutlined style={{ padding: '0 10px' }} />,
    [FileType.UNKNOWN]: <FileUnknownOutlined style={{ padding: '0 10px' }} />,
}

const fileTypeToColor: FileTypeToColorMapping = {
    [FileType.TXT]: 'blue',
    [FileType.PDF]: 'red',
    [FileType.GIF]: 'orange',
    [FileType.JPG]: 'green',
    [FileType.XLSX]: 'purple',
    [FileType.DOCX]: 'cyan',
    [FileType.MD]: 'magenta',
    [FileType.PPT]: 'gold',
    [FileType.ZIP]: 'lime',
    [FileType.UNKNOWN]: 'gray',
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