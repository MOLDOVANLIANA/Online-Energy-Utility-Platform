import React, {useEffect, useState, useRef} from 'react';
import {Widget, addResponseMessage, deleteMessages,addUserMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {sendMessage} from "../services/UserService";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {ChatStyle, SeenDiv, SeenDivAdmin, TypingDiv, TypingDivAdmin} from "../styles/Admin.style";
const ChatAdmin=({u,message})=>{
    const[messageList, setMessageList]=useState([]);
    const[chat, setChat]=useState(false);
    const[information,setInformation]=useState({
        "sender":"admin",
        "receiver":"",
        "message":"",
        "status":"MESSAGE"
    })
    const[seen,setSeen]=useState([]);
    const[typing,setTyping]=useState([]);

    const[chatUser, setChatUser]=useState();

    const useRefSeen = useRef();
    const useRefSeenSet = useRef();
    useRefSeen.current = seen;
    useRefSeenSet.current = setSeen;
    let user= JSON.parse(localStorage.getItem('person'));
    useEffect(() => {
        information.sender=user.name;
        //console.log(message);
        messageHandler(message);
        deleteMessages(500);
        loadMessages();
    },[u,message]);

    const loadMessages=()=>
    {
        messageList.forEach((item) => {
            if(item.sender==="admin")
            {
                if(item.receiver===u)
                {
                    addUserMessage(item.message)
                }
            }
            else
                if(item.sender===u)
                {
                    addResponseMessage(item.message)
                }
           // console.log(item);
        })
    }


    const messageHandler = (message)=>{
        var k =message;
        //console.log(message.status);
        if(message.status==="NULL")
        {
            console.log("*******")
        }
        else
        {
            if(message.status==="MESSAGE")
            {
                setChatUser(k.sender);
                messageList.push(k);
                setMessageList(messageList);
                setInformation({...information, message: ""})
                //setSeen(seen.filter(e => e !== k.sender))
                setTyping(typing.filter(e => e !== k.sender))
            }
            else if(message.status==="TYPING")
            {
                if(!typing.includes(k.sender))
                {
                    typing.push(k.sender);
                    setTyping(typing);
                }
            }
                else if(message.status==="SEEN")
            {
                useRefSeen.current.push(k.sender);
                useRefSeenSet.current(useRefSeen.current);
                setInformation({...information, message:"", status: "MESSAGE"})
                console.log(useRefSeen.current)
                console.log("sth")

            }

        }



    }

    const handleTyping=(e)=>
    {
        information.message=e.target.innerText;
        var chatMessage = {
        sender:"admin",
        receiver: u,
        message:"",
        status:"TYPING",
    };
        sendMessage(chatMessage);
        //console.log(information.message)
    }


    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        information.receiver=u;
        setInformation({...information, message:newMessage, status: "MESSAGE"})
        messageList.push(information);
        setMessageList(messageList);
        sendMessage(information);
        setSeen(seen.filter(e => e !== u))
        //console.log(information)

        // Now send the message throught the backend API
    };

    const Customcomponent = () => {
        return(
            <div>
                typing
            </div>
        )
    }
    return (
        <div
        >
                <Widget
                    handleNewUserMessage={handleNewUserMessage}
                    handleTextInputChange={(e)=>handleTyping(e)}
                    title={"Your chat with " + u}
                    showBadge={false}
                    subtitle={"Send a message"}
                    randomCustomComponent={<Customcomponent />}
                    emojis={true}

                />
            {seen.includes(u) ? <SeenDivAdmin>seen</SeenDivAdmin> : <div />}
            {typing.includes(u) ? <TypingDivAdmin>typing...</TypingDivAdmin> : <div />}
        </div>
    );
}
export default ChatAdmin;