import React from 'react';
import { Button, Input, Popconfirm, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useLocalStorage } from 'usehooks-ts'

import { callAPI } from '../../api/openai';
import { FileDto } from '../../api/file';
import { FolderDto } from '../../api/folder';

const PopDescription: React.FC = () => {
    const [value, setValue, removeValue] = useLocalStorage('api-key', '');
    const [modelProvider, setModelProvider, removeModelProvider] = useLocalStorage('model-provider', 'groq');
    
    return (
        <div>
            <Select
                defaultValue={modelProvider}
                style={{ width: 120 }}
                onChange={(value) => setModelProvider(value)}
                options={[
                    { value: 'groq', label: 'Groq' },
                    { value: 'openai', label: 'OpenAI' },
                    { value: 'anthropic', label: 'Anthropic' },
                ]}
            />
            <Input.Password 
                onChange={(e) => setValue(e.target.value)} 
                value={value} 
                placeholder="Enter your API key"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
            />
        </div>
    );
}

export const ChatGPTGenerator: React.FC<{
    onDataLoaded: (data: {
        files: Array<FileDto>;
        folders: Array<FolderDto>;
    }) => void
}> = ({onDataLoaded}) => {
    const [apiKey] = useLocalStorage('api-key', '');
    const [modelProvider] = useLocalStorage('model-provider', 'groq');
  
    const confirm = async () => {
        const data = await callAPI(modelProvider, apiKey);

        if (data) {
            onDataLoaded(data);
        }
    }

  return (
    <Popconfirm
      title="Only tested with Groq, which has free tier API without subscription"
      description={<PopDescription />}
      onConfirm={confirm}
    >
      <Button type="primary">Generate folder and files data using ChatGPT</Button>
    </Popconfirm>
  );
};