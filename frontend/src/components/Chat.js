import React, {useEffect, useState,useRef} from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {sendMessage} from "../services/UserService";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {SeenDiv, TypingDiv} from "../styles/Admin.style";
const Chat=()=> {

    const[chat, setChat]=useState(false);
    const[information,setInformation]=useState({
        "sender":"",
        "receiver":"admin",
        "message":"",
        "status":"MESSAGE"
    })
    let user= JSON.parse(localStorage.getItem('person'));
    const stateRefChat=useRef();
    stateRefChat.current=chat;
    const[seen, setSeen]=useState(false);
    const[typing, setTyping]=useState(false);
    useEffect(() => {
        information.sender=user.name;

        const ws=new SockJS('http://localhost:8081/message');
        const client=over(ws);
        console.log("conectat la ")
        client.connect({}, connection => {

            client.subscribe("/topic/" + user.name + "/receiver", messageHandler);
        })
    }, []);

    const messageHandler = (message)=>{
        var k = JSON.parse(message.body);
        if(k.status==="MESSAGE")
        {
            addResponseMessage(k.message);
            setInformation({...information, message:"", status: "MESSAGE"});
            console.log( stateRefChat.current+"de aici")
            if(stateRefChat.current)
            {
                console.log("**user")
                var chatMessage = {
                    sender:user.name,
                    receiver: "admin",
                    message:"seenut",
                    status:"SEEN",
                };
                sendMessage(chatMessage);
            }
        setTyping(false);
        }
        else if(k.status==="TYPING")
        {
            setTyping(true);
        }
        else if(k.status==="SEEN")
        {
             setSeen(true);
        }
    }

    const handleTyping=(e)=>
    {
       information.message=e.target.innerText;
        var chatMessage = {
            sender:user.name,
            receiver: "admin",
            message:"",
            status:"TYPING",
        };
        sendMessage(chatMessage);
        //console.log(information.message)
    }
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        setInformation({...information, message:newMessage, status: "MESSAGE"})
        sendMessage(information);
        setSeen(false);
        console.log(information)
        // Now send the message throught the backend API
    };

    const handleClick=()=>
    {
        setChat(!chat);
        if(!chat)
        {
            var chatMessage = {
                sender:user.name,
                receiver: "admin",
                message:"seenut",
                status:"SEEN",
            };
            sendMessage(chatMessage);
        }
    }
    const handleSubmit=()=>
    {
        console.log("hi");
    }
    return (
        <div
        >
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                launcherOpenLabel={chat? "Open chat" : "" }
                handleToggle={()=>handleClick()}
                handleTextInputChange={(e)=>handleTyping(e)}

                title={"How can I help you?"}
                subtitle={"Send a message"}
                emojis={true}
            />
            {seen && chat ? <SeenDiv>seen</SeenDiv> : <div />}
            {typing && chat ? <TypingDiv>typing...</TypingDiv> : <div />}
        </div>
    );
}
export default Chat;