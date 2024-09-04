Hi,

Motivation:
As a user I want to be able to manage my file system. I have files and folders.
Folder may contains file and folders. Files belongs to specific folder. Currently API is on development,
Hovewer there is agreed data structure which will be returned from server.

API details:
Use source.ts where:
 - endpoint which returns files and folders with mock data;
 File: contains folderId - as refference to specific folder.
 = endpoint which returns folders with mock data;
 Folder: contains folderId - as a refference to specific folder.
 Note: Folder.folderId is nullable, which means root folder, File.folderId - is mandatory, so file should be part of some folder.


UI details:
Build UI for viewing files and folders. Folder should be collapsed.
UI should consists of:
Header: SearchBar - finding files by name. Checkboxes which filters files by type.
Structure of folders and files. Next level of nested items should be shifted or outlined somehow.
File should have some indication, different color for different types.

Will be a plus (but don't waste time if you are not sure):
- mobx;
- antd;

Note: importance of this task is not completed it fully, but building good code and maintanable code.
You can use everyhing you want except of CHAT gpt :)

If you have questions or ideas or improvement feel free to ask me