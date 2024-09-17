import axios from "axios";

export const api = axios.create({
  baseURL: "https://shop-1-te1x.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
