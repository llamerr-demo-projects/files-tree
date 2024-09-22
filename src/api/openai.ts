import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { FileType } from './fileType';
import { FileDto } from './file';
import { FolderDto } from './folder';

const FOLDERS_LIMIT = 10;
const FILES_LIMIT = 30;

const FolderListShema = z.object({
    id: z.number(),
    name: z.string(),
    folderId: z.number()
}).array();
const FolderListShemaDescription = 'This is a list of folders.'

const FileListShema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.nativeEnum(FileType),
    folderId: z.number()
}).array();
const FileListShemaDescription = 'This is a list of files.'

export const callAPI = async (modelProvider: string, apiKey: string): Promise<{files: Array<FileDto>, folders: Array<FolderDto>}> => {
    // TODO: create singleton that will store the model
    // TODO: or move the model away from this file and allow passing it
    // i.e. cache the key/model when it changes and get rid of old key/model
    let model;
    switch (modelProvider) {
        case 'groq':
            model = new ChatGroq({
                apiKey: apiKey,
                modelName: "llama3-8b-8192",
            });
            break;
        case 'openai':
            model = new ChatOpenAI({
                openAIApiKey: apiKey,
                modelName: "gpt-3.5-turbo-instruct",
            });
            break;
        case 'anthropic':
            model = new ChatAnthropic({
                apiKey: apiKey,
                modelName: "claude-3-opus-20240229",
            });
            break;
        default:
            throw new Error(`Invalid model provider: ${modelProvider}`);
    }

    const folderSchema = JSON.stringify(zodToJsonSchema(FolderListShema, FolderListShemaDescription), null, '\t');
    const fileSchema = JSON.stringify(zodToJsonSchema(FileListShema, FileListShemaDescription), null, '\t');

    const completion = await model.invoke([new HumanMessage({ 
        content: `
        Given a user prompt, you will return fully valid JSON based on the following description and schema. 
        You will return no other prose. You will take into account any descriptions or required parameters within the schema 
        and return a valid and fully escaped JSON object that matches the schema and those instructions.
        
        Schema 1, folders list:
        description: ${FolderListShemaDescription}
        json schema: ${folderSchema}
        
        Schema 2, files list:
        description: ${FileListShemaDescription}
        json schema: ${fileSchema}
        
        FileType enum is: ${JSON.stringify(FileType, null, '\t')}

        Generate me realistically looking list of ${FOLDERS_LIMIT} folders with human named names. Some folders should be located inside other folders. There should be at least 3 folders at the root level.
        Generate me realistically looking list of ${FILES_LIMIT} files with human named names. Those files should be located inside previously generated folders. Those files should be compatible with usual limitations of the file systems and be unique inside the folder. Those files should have realistic non-generic names, not like "file1.txt", but be creative like "Report_August2024.docx" or something similar.
        Place both lists in a valid JSON object with keys "files" and "folders". Return only single JSON object in a single message that only contains that valid JSON object and nothing else.
        `
    })]);
    console.log(completion.lc_kwargs.content);
    let json;
    try {
        json = JSON.parse(completion.lc_kwargs.content);
        console.log('normal json', json);
    } catch (error) {
        console.warn('llm is too talkative', error);
        // llm responds with a text that contains json inside ```markdown``` and we will need to parse it first
        json = JSON.parse(completion.lc_kwargs.content.split('```')[1]);
        console.log('parsed json', json);
    }
    //TODO: process errors in case key is wrong or llm is not responding or anything else happens
    return json;    
}
