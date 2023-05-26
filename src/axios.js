import axios from "axios";

axios.defaults.baseURL = "http://cookolistob.cluster-ig3.igpolytech.fr/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
