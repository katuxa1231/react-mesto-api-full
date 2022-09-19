import { BASE_URL } from './constants';
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkResponse(res)
    })
}

export const login = (email, password) => {
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

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res)
    })
}

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res);
}
