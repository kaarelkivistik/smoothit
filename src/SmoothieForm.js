import React, { useCallback, useState } from "react";
import SmoothieComponentForm from "./SmoothieComponentForm";

const SmoothieForm = ({ defaultValue, onSave }) => {
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
      <h3>Smoothie details</h3>

      <p>
        <label>
          Name
          <br />
          <input name="name" value={value.name} onChange={onFieldChange} />
        </label>
      </p>

      <p>
        <label>
          Description
          <br />
          <input name="description" value={value.description} onChange={onFieldChange} />
        </label>
      </p>

      <p>
        <label>
          Instructions
          <br />
          <textarea name="instructions" value={value.instructions} onChange={onFieldChange} />
        </label>
      </p>

      <h3>Components</h3>

      {value.smoothieComponents.map((smoothieComponent, index) => (
        <SmoothieComponentForm
          key={smoothieComponent.id || smoothieComponent.$id}
          value={smoothieComponent}
          onChange={value => onComponentChange(value, index)}
        />
      ))}

      <button type="button" onClick={addComponent}>
        Add a component
      </button>
      <button type="submit">Save</button>
    </form>
  );
};

const updateArrayItem = (array, index, updater) =>
  array.map((item, $index) => (index === $index ? updater(item) : item));

export default SmoothieForm;
