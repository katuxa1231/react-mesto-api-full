export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkResponse(res)
    })
}

export const logIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkResponse(res)
    })
}

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then((res) => {
      return checkResponse(res)
    })
}

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res);
}
