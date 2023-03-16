import axios from "axios";

const client = axios.create({
  baseURL: "https://houmuch.co.kr/resources"
})

client.interceptors.request.use(value => {
  console.log(value)
  return value
})

export default client

