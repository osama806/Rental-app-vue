import axios from "axios";

export default axios.create({
  baseURL: "http://osama1410.infinityfreeapp.com/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  mode: "cors"
})
