import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import { Add } from '@mui/icons-material';

const AutocompleteField = ({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  freeSolo = true,
  multiple = false,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event, newValue) => {
    if (multiple) {
      onChange(newValue);
    } else {
      onChange(newValue);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const filterOptions = (options, { inputValue }) => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    if (inputValue !== '' && !filtered.includes(inputValue)) {
      filtered.push(inputValue);
    }
    
    return filtered;
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      filterOptions={filterOptions}
      freeSolo={freeSolo}
      multiple={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {inputValue && !options.includes(inputValue) && (
                  <Chip
                    icon={<Add />}
                    label={`Add "${inputValue}"`}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                )}
                {params.InputProps.endAdornment}
              </Box>
            ),
          }}
        />
      )}
      renderTags={multiple ? (value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={index}
          />
        ))
      : undefined}
      {...props}
    />
  );
};

export default AutocompleteField;