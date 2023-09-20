import axios from "axios"


export const makeMultiRequest = axios.create({
    baseURL: process.env.REACT_APP_API_REQUEST_URL,
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
  