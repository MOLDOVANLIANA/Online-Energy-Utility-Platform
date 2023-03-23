import axios from "axios";

export const getListUsers = () => {
    return axios.get("http://localhost:8081/person/allUsers");
};

export const getUsers = () => {
    return axios.get("http://localhost:8081/person/all");
};
export const deleteUsers = (id) => {
    return axios.post(`http://localhost:8081/person/${id}`);
};

export const insertUser = (name,password, role) => {
    return axios.post("http://localhost:8081/person", {name: name, password: password, rol: role});
};

export const updateUser = (id, name,password, role) => {
    return axios.post("http://localhost:8081/person/update", {id:id, name: name, password: password, rol: role});
};

export const sendMessage = (data) => {
    return axios.post("http://localhost:8081/person/redirect", {sender:data.sender, receiver:data.receiver, message:data.message, status:data.status });
};