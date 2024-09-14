import { FileDto } from "../../api/file";
import { FolderDto } from "../../api/folder";

export type RecursiveFolderTree = Array<FolderDto & {
    folders: RecursiveFolderTree;
    files: Array<FileDto>;
}>

export const pushNested = (folder: FolderDto, folders: RecursiveFolderTree): boolean => {
    let hadBeenPushed = false;
    for (const f of folders) {
        if (f.id === folder.folderId) {
            f.folders.push({ ...folder, folders: [], files: [] });
            hadBeenPushed = true;
        } else if (f.folders.length > 0) {
            hadBeenPushed = pushNested(folder, f.folders)
        }
        if (hadBeenPushed) break;
    }
    return hadBeenPushed;
}

// if order of items is screwed on API side and items not coming in order (parent first, children last)
// instead of pre-sorting them, to minimize amount of loops, process one at a time and remove processed from the queue
// if some children are orphan nodes and have no parents, add them to root as top folders
export const processFolders = (folders: Array<FolderDto>, processed: RecursiveFolderTree = []) => {
    const stash: Array<FolderDto> = [];
    const initialLength = folders.length;
    while (folders.length > 0) {
        const folder = folders.shift();
        if (folder && !folder.folderId) processed.push({ ...folder, folders: [], files: [] });
        if (folder && folder.folderId) {
            // if we already added parent folder, add item to parent folder
            const hadBeenPushed = pushNested(folder, processed);
            // if parent folder wasn't added yet, move it to the end of the queue
            if (!hadBeenPushed) stash.push(folder);
        }
    }
    // if some potential parent folders were added to processed list then some new children may be added to them on next run
    if (initialLength != stash.length) {
        processed = processFolders(stash, processed);
    }
    // otherwise if lenght hasn't changed, it means we only have orphan nodes left, so add them to root
    else {
        processed = processed.concat(stash.map((folder) => ({ ...folder, folders: [], files: [] })));
    }
    return processed;
}

export const processFiles = (folders: RecursiveFolderTree, files: Array<FileDto>) => {
    for (const folder of folders) {
        folder.files = files.filter(file => file.folderId === folder.id);
        if (folder.folders.length > 0) {
            processFiles(folder.folders, files);
        }
    }
}