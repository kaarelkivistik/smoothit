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
    <>
      <ComponentPicker value={value.component} onChange={onComponentChange} />
      <Amount value={value.amount} onChange={onAmountChange} />
      <hr />
    </>
  );
};

const ComponentPicker = ({ value, onChange }) => {
  const components = usePromise(getComponents, []);

  const onSelectChange = useCallback(({ target: { value } }) => onChange(findById(components, parseInt(value))), [
    components,
    onChange
  ]);

  return (
    <p>
      <label>
        Component
        <br />
        <select value={value && value.id} onChange={onSelectChange}>
          <option>-- Vali koostiosa --</option>
          {components.map(component => (
            <option key={component.id} value={component.id}>
              {component.name}, {component.brand}, €{component.unitPriceEur.toFixed(2)}/{component.unit},{" "}
              {component.kcalPerUnit}kcal/{component.unit}
            </option>
          ))}
        </select>
      </label>
    </p>
  );
};

const getComponents = () => fetchFromCatalogApi("/components").then(response => response.content);

const findById = (array, id) => array.find(item => id === item.id);

const Amount = ({ value, onChange }) => (
  <p>
    <label>
      Amount
      <br />
      <input type="number" value={typeof value === "number" ? value : 0} onChange={onChange} />
    </label>
  </p>
);

export default SmoothieComponentForm;
