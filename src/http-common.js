import axios from "axios";

export default axios.create({
  baseURL: "https://osama1410.infinityfreeapp.com/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://osama1410.infinityfreeapp.com, https://estate-rental-app.netlify.app",
  },
})
