import axios from "axios";

const instance = axios.create({
  baseURL: "https://srinidhisarovar.firebaseio.com"
});

export default instance;
