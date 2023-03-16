import axios from "axios";

const client = axios.create({
  // baseURL: "http://localhost:7777/api",
  baseURL: "https://houmuch.co.kr/api",
  headers: {
    "Content-Type": "application/json"
  },
  transformResponse: [
    data => {
      const json = JSON.parse(data)
      if (Array.isArray(json.data)) {
        return json.data
      } else {
        return { ...json.data }
      }
    }
  ]
})

client.interceptors.request.use(value => {
  console.log(value)
  return value
})

export default client

