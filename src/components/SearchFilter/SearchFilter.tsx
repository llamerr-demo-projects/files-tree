import React from 'react';
import { Input, Select } from 'antd';
import { FileType } from '../../api/fileType';

import './SearchFilter.styles.css';
import { BaseOptionType } from 'antd/es/select';

const { Option } = Select;

const SelectAfter: React.FC<{onChange: (value: Array<string>) => void}> = ({onChange}) => {
  let options = [];
  for (const type in FileType) {
    if (!isNaN(Number(type))) options.push(<Option key={type} value={type}>{FileType[type]}</Option>)
  };
  return (
    <Select className='search-filter' placeholder="Filter by file type" mode="multiple" onChange={(value, option) => onChange(option.map((o: BaseOptionType) => o.value))}>
      {options}
    </Select>
  )
};

export type SearchFilterValue = {
  value: string;
  options: Array<string>;
}

export const SearchFilter: React.FC<{onChange: (value: SearchFilterValue) => void}> = ({onChange}) => {
  const [options, setOptions] = React.useState<Array<string>>([]);
  const [value, setValue] = React.useState<string>('');

  const handleOptionsChange = (optionsValue: Array<string>) => {
    setOptions(optionsValue);
    onChange({value, options: optionsValue});
  };

  const handleValueChange = (valueValue: string) => {
    setValue(valueValue);
    onChange({value: valueValue, options});
  };

  return (
    <Input placeholder='Filter by file name (only files, not directories)' addonAfter={<SelectAfter onChange={handleOptionsChange} />} onChange={(e) => handleValueChange(e.target.value)} />
  );
}