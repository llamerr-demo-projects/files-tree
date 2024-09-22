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
          {
            id: 5,
            name: "hooollooFF.pdf",
            type: FileType.PDF,
            folderId: 811,
          },
          {
            id: 6,
            name: "hooollooFF.pdf",
            type: FileType.PDF,
            folderId: 811,
          },
          {
            id: 7,
            name: "hooollooFF.pdf",
            type: FileType.PDF,
            folderId: 713,
          },
        ]);
      }, 3000); // Delay of 1000 milliseconds (1 second)
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
          // test nested folders
          {
            id: 31,
            name: "Salary 2024",
            folderId: 3,
          },
          {
            id: 32,
            name: "Salary 2023",
            folderId: 3,
          },
          {
            id: 33,
            name: "Salary 2022",
            folderId: 3,
          },
          // test when nested folder appears before parent folder
          {
            id: 41,
            name: "Salary 2025",
            folderId: 4,
          },
          {
            id: 4,
            name: "Salary 2026",
          },
          // test when parent folder does not exist (just add as parent folder itself)
          {
            id: 5,
            name: "Salary 2027",
            folderId: 100,
          },
          // added twice to test for infinite loop
          {
            id: 6,
            name: "Salary 2028",
            folderId: 200,
          },
          // test double nested
          {
            id: 7,
            name: "Anime",
          },
          {
            id: 71,
            name: "Anime 2024",
            folderId: 7,
          },
          {
            id: 72,
            name: "Anime 2023",
            folderId: 7,
          },
          {
            id: 73,
            name: "Anime 2022",
            folderId: 7,
          },
          {
            id: 711,
            name: "Best Anime 2024",
            folderId: 71,
          },
          {
            id: 712,
            name: "Best Anime 2023",
            folderId: 71,
          },
          {
            id: 713,
            name: "Best Anime 2022",
            folderId: 71,
          },
          // test double nested when parent added in reverse order
          {
            id: 811,
            name: "Best TV 2024",
            folderId: 81,
          },
          {
            id: 81,
            name: "TV 2024",
            folderId: 8,
          },
          {
            id: 8,
            name: "TV",
          },
        ]);
      }, 1000); // Delay of 1000 milliseconds (1 second)
    });
  },
};
