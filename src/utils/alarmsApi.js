const BASE_URL = "https://621e9d00849220b1fc9db0af.mockapi.io/api/phone/contacts";

const fetchData = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}/${path}`, options);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const getItems = (endpoint, options) => fetchData(endpoint, options);

const saveItem = (endpoint, item, options = {}) => {

  const finalOptions = {
    method: "POST",

    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  };
  return fetchData(endpoint, finalOptions);
};
const toggleItem = (endpoint, item, options = {}) => {
  const finalOptions = {
    method: "PUT",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  };
  return fetchData(`${endpoint}/${item.createdAt}`, finalOptions);
};

const deleteItem = (endpoint, id, options = {}) =>
  fetchData(`${endpoint}/${id}`, { method: "DELETE", ...options });

export { getItems,toggleItem, saveItem, deleteItem };