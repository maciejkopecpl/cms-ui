const commonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const API_URL = process.env.API_URL;

export const getData = async url =>
  await fetch(API_URL + url, { headers: commonHeaders }).then(res =>
    res.json()
  );

export const postData = async (url, payload) =>
  await fetch(API_URL + url, {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify(payload),
  }).then(res => res.json());
