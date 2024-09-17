import axios from "axios";

export const api = axios.create({
  baseURL: "https://shop-c9xh.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
