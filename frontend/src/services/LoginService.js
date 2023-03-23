import axios from "axios";

export const login = (name, password) => {
    return fetch("http://localhost:8081/login", {
        method: "POST",
        mode: 'no-cors',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "username": name,
            "password": password
        })
    })
};

