import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { fetchFromCatalogApi, usePromise } from "./shared";

const SmoothieComponentForm = ({ value, onChange }) => {
  const onComponentChange = useCallback(
    value =>
      onChange(prevState => ({
        ...prevState,
        component: value
      })),
    [onChange]
  );

  const onAmountChange = useCallback(
    ({ target: { value } }) =>
      onChange(prevState => ({
        ...prevState,
        amount: parseInt(value)
      })),
    [onChange]
  );

  return (
    <Box display="flex" flexDirection="row" mb={4}>
      <Box width={400} mr={2}>
        <ComponentPicker value={value.component} onChange={onComponentChange} />
      </Box>
      <Box>
        <Amount value={value.amount} onChange={onAmountChange} />
      </Box>
    </Box>
  );
};

const ComponentPicker = ({ value, onChange }) => {
  const components = usePromise(getComponents, []);

  const onSelectChange = useCallback(({ target: { value } }) => onChange(findById(components, parseInt(value))), [
    components,
    onChange
  ]);

  return (
    <FormControl fullWidth>
      <InputLabel>Component</InputLabel>
      <Select value={value ? value.id : ""} onChange={onSelectChange} fullWidth>
        {components.map(component => (
          <MenuItem key={component.id} value={component.id}>
            {component.name}, {component.brand}, €{component.unitPriceEur.toFixed(2)}/{component.unit},{" "}
            {component.kcalPerUnit}kcal/{component.unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const getComponents = () => fetchFromCatalogApi("/components").then(response => response.content);

const findById = (array, id) => array.find(item => id === item.id);

const Amount = ({ value, onChange }) => (
  <TextField
    label="Amount"
    name="amount"
    type="number"
    value={typeof value === "number" ? value : 0}
    onChange={onChange}
  />
);

export default SmoothieComponentForm;
