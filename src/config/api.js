const baseUrl = process.env.REACT_APP_API_URL;

const get = (pathUrl, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

const post = (pathUrl, data, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const put = (pathUrl, data, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const patch = (pathUrl, data, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const del = (pathUrl, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

const file = (method, pathUrl, data, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  }).then((res) => res.json());

// Third-party API (https://countrystatecity.in/)
const getCountries = async (pathUrl) => {
  const headers = new Headers();
  headers.append('X-CSCAPI-KEY', process.env.REACT_APP_COUNTRY_STATE_CITY_API);

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  return await fetch(pathUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};

const getCurrencies = async (pathUrl) => {
  const requestOptions = { method: 'GET' };

  return await fetch(pathUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error));
};

export { get, post, put, patch, del, file, getCountries, getCurrencies };
