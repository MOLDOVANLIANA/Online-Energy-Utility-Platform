import React, {useState} from 'react'
import "../styles/Login.css"
import {login} from "../services/LoginService";
import {Redirect, useNavigate} from "react-router-dom";
import background from "../images/1.jpg";
import SockJS from 'sockjs-client';
import {over} from 'stompjs';

function Login() {

    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    let red=useNavigate();

    const validation=() => {

        login(username,password).then((resulted) => {
        console.log(resulted);
        resulted.json().then(data =>{
            console.log(data.access_token);

            })
            /*if(resulted.data.rol==="ADMIN")
            {
                localStorage.setItem("person", JSON.stringify(resulted.data));
                red("/Admin");
            }
            else if(resulted.data.rol==="USER")
            {
                console.log("conectat la ")
                localStorage.setItem("person", JSON.stringify(resulted.data));
                const ws=new SockJS('http://localhost:8081/message');
                const client=over(ws);
                console.log("conectat la ")
                client.connect({}, connection => {

                    client.subscribe("/topic/" + resulted.data.name + "/user", messageHandler);
                })
                red("/User");
            }
            else
            {
                setUsername("");
                setPassword("");
            }

             */
        })
    }
    const messageHandler = (message)=>{
        alert(message.body);

    }

    return (

        <div id="app">
            <section>
                <div className="imgBx" style={{ backgroundImage: `url(${background})` }}>

                </div>
                <div className="contentBox">
                    <div className="formBx">
                        <h2>Login</h2>
                        <form>
                            <div className="inputBx">
                                <span>Username</span>
                                <input
                                    type="text"
                                    name={"username"}
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="inputBx">
                                <span>Password</span>
                                <input
                                    type="password"
                                    name={"password"}
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="inputBx">
                                <input type="button" onClick={validation} value="Sign in" name="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Login