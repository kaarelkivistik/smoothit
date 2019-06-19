import { useCallback, useEffect, useState } from "react";

export const fetchFromCatalogApi = (path, options) => myFetch(`/catalogapi/api${path}`, options);
export const fetchFromOrderApi = (path, options) => myFetch(`/orderapi/api${path}`, options);

const myFetch = (path, { body, headers = {}, ...options } = {}) =>
  fetch(path, {
    headers: {
      "content-type": body && "application/json",
      ...headers
    },
    body: body && JSON.stringify(body),
    ...options
  })
    .then(isOk)
    .then(toJson);

const isOk = response => (response.ok ? response : Promise.reject(response));
const toJson = async response => {
  try {
    return await response.json();
  } catch (e) {}
};

export const usePromise = (...args) => {
  const [value] = useRefreshablePromise(...args);

  return value;
};

export const useRefreshablePromise = (methodThatReturnsAPromise, initialValue) => {
  const [value, setValue] = useState(initialValue);

  const refresh = useCallback(() => methodThatReturnsAPromise().then(setValue), [methodThatReturnsAPromise]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [value, refresh];
};
