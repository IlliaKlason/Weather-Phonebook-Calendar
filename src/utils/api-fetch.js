
// const BASE_URL = "https://621e9d00849220b1fc9db0af.mockapi.io/api/phone/contacts";

const BASE_URL = "https://connections-api.herokuapp.com";
const API_ENDPOINT = 'contacts';

const fetchData = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}/${path}`, options);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

///MOCAPI
// const getItems = (endpoint, options) => fetchData(endpoint, options);

/// 8-ма домашня
const getItems = (token) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  };
  return fetchData(API_ENDPOINT, options);
};



const saveItem = ( item,token,options = {}) => {
  const finalOptions = {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`
    },
    ...options,
  };
  return fetchData(API_ENDPOINT, finalOptions);
};

const editItem = ({id,name,number}, token, options = {}) => {
  const finalBody = {
    name,
    number
  }
  const finalOptions = {
    method: "PATCH",
    body: JSON.stringify(finalBody),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`
    },
    ...options,
  };
  return fetchData(`${API_ENDPOINT}/${id}`, finalOptions);
};

const deleteItem = (id, token, options = {}) => 
{
  return fetchData(`${API_ENDPOINT}/${id}`, {
    method: "DELETE",
      headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`
    },  ...options
  })};

export { getItems, saveItem,editItem, deleteItem };