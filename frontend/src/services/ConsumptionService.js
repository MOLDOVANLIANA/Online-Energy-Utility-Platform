import axios from "axios";

export const getConsumption = (id, time) => {
    return axios.post("http://localhost:8081/cons", {idDevice:id,time: time});
};