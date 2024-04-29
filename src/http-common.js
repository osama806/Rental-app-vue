import axios from "axios";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

export default axios.create({
  baseURL: "https://osama1410.infinityfreeapp.com/api",
  headers: {
    "Content-Type": "application/json"
  }
})
