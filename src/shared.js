export const fetchFromCatalogApi = (path, options) => myFetch(`/catalogapi/api${path}`, options);
export const fetchFromOrderApi = (path, options) => myFetch(`/orderapi/api${path}`, options);

const myFetch = (...args) =>
  fetch(...args)
    .then(isOk)
    .then(toJson);

const isOk = response => (response.ok ? response : Promise.reject(response));
const toJson = response => response.json();
