import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import SmoothieComponentForm from "./SmoothieComponentForm";

const SmoothieForm = ({ defaultValue, onSave, onDelete }) => {
  const [value, setValue] = useState(defaultValue);

  const onSubmit = event => {
    event.preventDefault();
    onSave(value);
  };

  const onFieldChange = useCallback(
    ({ target: { name, value } }) =>
      setValue(prevState => ({
        ...prevState,
        [name]: value
      })),
    [setValue]
  );

  const onComponentChange = useCallback(
    (updater, index) =>
      setValue(prevState => ({
        ...prevState,
        smoothieComponents: updateArrayItem(prevState.smoothieComponents, index, updater)
      })),
    []
  );

  const addComponent = useCallback(
    () =>
      setValue(prevState => ({
        ...prevState,
        smoothieComponents: [...prevState.smoothieComponents, { $id: prevState.smoothieComponents.length }]
      })),
    []
  );

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" gutterBottom>
        Smoothie details
      </Typography>

      <Box display="flex" flexDirection="column" mb={2}>
        <TextField label="Name" name="name" value={value.name} onChange={onFieldChange} margin="normal" />
        <TextField
          label="Description"
          name="description"
          value={value.description}
          onChange={onFieldChange}
          margin="normal"
        />
        <TextField
          label="Instructions"
          name="instructions"
          value={value.instructions}
          onChange={onFieldChange}
          margin="normal"
          multiline
        />
      </Box>

      <Typography variant="h4" gutterBottom>
        Components
      </Typography>

      {value.smoothieComponents.map((smoothieComponent, index) => (
        <SmoothieComponentForm
          key={smoothieComponent.id || smoothieComponent.$id}
          value={smoothieComponent}
          onChange={value => onComponentChange(value, index)}
        />
      ))}

      <Box display="flex">
        <Box mr={2}>
          <Button type="button" onClick={addComponent}>
            Add a component
          </Button>
        </Box>
        {onDelete && (
          <Box mr={2}>
            <Button type="button" variant="contained" color="secondary" onClick={onDelete}>
              Delete smoothie
            </Button>
          </Box>
        )}
        <Box>
          <Button type="submit" variant="contained" color="primary">
            Save smoothie
          </Button>
        </Box>
      </Box>
    </form>
  );
};

const updateArrayItem = (array, index, updater) =>
  array.map((item, $index) => (index === $index ? updater(item) : item));

export default SmoothieForm;
