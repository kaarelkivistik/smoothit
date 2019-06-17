import React, { useCallback, useState } from "react";

const SmoothieForm = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  const onFieldChange = useCallback(
    ({ target: { name, value } }) =>
      setValue(prevState => ({
        ...prevState,
        [name]: value
      })),
    [setValue]
  );

  return (
    <form>
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

      <pre>{JSON.stringify(value.smoothieComponents, null, 2)}</pre>
    </form>
  );
};

export default SmoothieForm;
