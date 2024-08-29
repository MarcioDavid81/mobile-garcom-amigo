import axios from "axios";

const api = axios.create({
  baseURL: "https://garcom-amigo-02cbe20b86fe.herokuapp.com",
});

export { api };