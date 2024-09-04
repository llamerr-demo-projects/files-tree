import { FolderDto } from "./folder";
import { FileDto } from "./file";
import { FileType } from "./fileType";

export const sourceApi = {
  getFiles: (): Promise<Array<FileDto>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "mydata.txt",
            type: FileType.TXT,
            folderId: 2,
          },
          {
            id: 2,
            name: "foodf.pdf",
            type: FileType.PDF,
            folderId: 2,
          },
          {
            id: 3,
            name: "GREEEN_BEER.txt",
            type: FileType.TXT,
            folderId: 31,
          },
          {
            id: 4,
            name: "hooollooFF.pdf",
            type: FileType.PDF,
            folderId: 3,
          },
        ]);
      }, 1000); // Delay of 1000 milliseconds (1 second)
    });
  },
  getFolders: (): Promise<Array<FolderDto>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Empty",
          },
          {
            id: 2,
            name: "Archived",
          },
          {
            id: 3,
            name: "Review",
          },
          /*
          {
            id: 31,
            name: "Salary 2024",
            folderId: 3,
          },
          */
        ]);
      }, 1000); // Delay of 1000 milliseconds (1 second)
    });
  },
};
