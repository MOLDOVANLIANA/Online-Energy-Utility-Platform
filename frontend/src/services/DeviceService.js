import axios from "axios";

export const getListDevices= () => {
    return axios.get("http://localhost:8081/device/all");
};
export const deleteDevice = (id) => {
    return axios.post(`http://localhost:8081/device/${id}`);
};
export const insertDevice = (description,address, maxConsumption) => {
    return axios.post("http://localhost:8081/device/insertDevice", {description: description, address: address, maxConsumtion: maxConsumption});
};

export const updateDevice = (id, description,address, maxConsumption,user) => {
    return axios.post("http://localhost:8081/device/update", {id:id,description: description, address: address, maxConsumtion: maxConsumption, user:user});
};

export const getListDevicesUnassigned= () => {
    return axios.get("http://localhost:8081/device/unassigned");
};

export const AssignUser=(idUser, idDevice) =>{
    return axios.post("http://localhost:8081/device/asign", {idUser:idUser, idDevice:idDevice});
};

export const getUsersDevices=(id) =>{
    return axios.get(`http://localhost:8081/device/${id}`);
};

export const getID=(id) =>
{
     return axios.post(`http://localhost:9000/cons/${id}`);
};