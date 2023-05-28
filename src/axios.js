import axios from "axios";

axios.defaults.baseURL =
  "http://cookolistoba.cluster-ig3.igpolytech.fr" || "http://localhost:4000/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
