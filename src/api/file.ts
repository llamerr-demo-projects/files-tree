import { FileType } from "./fileType";

export type FileDto = {
  id: number;
  name: string;
  type: FileType;
  folderId: number;
};
