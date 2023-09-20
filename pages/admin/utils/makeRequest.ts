import axios from "axios"


export const makeMultiRequest = axios.create({
    baseURL: "http://localhost:8800/api",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  