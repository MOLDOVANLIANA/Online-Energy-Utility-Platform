import React, {useEffect, useState, useRef} from 'react'
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper, TextField, Box, Select, MenuItem, InputLabel, FormControl
} from '@mui/material'
import {ButtonStyle} from "../styles/Assign.style";
import {deleteUsers, getListUsers, insertUser, sendMessage, updateUser} from "../services/UserService";
import {
    AdminStyleDiv,
    ComponentStyleDiv,
    CRUDStyleDiv,
    LabelStyle,
    TableStyleDiv
} from "../styles/Admin.style";
import Navbar from "../components/Navbar"
import {useNavigate} from "react-router-dom";
import ChatAdmin from "./ChatAdmin";
import SockJS from "sockjs-client";
import {over} from "stompjs";
function Admin() {

    let red=useNavigate();
    const stateRefUser=useRef();

    const [name, setName]=useState("");
    stateRefUser.current=name;
    const[data, setData]= useState([]);
    const [id, setId]=useState("");
    const[role, setRole]=useState("");
    const[password, setPassword]=useState("");
    const[message, setMessage]=useState({
        "sender":"",
        "receiver":"",
        "message":"",
        "status":""
    });
    let user= JSON.parse(localStorage.getItem('person'));

    useEffect(() => {
        if(user.rol== "USER")
        {
            red("/");
        }
        const ws=new SockJS('http://localhost:8081/message');
        const client=over(ws);
        console.log("conectat la ")
        client.connect({}, connection => {
            client.subscribe("/topic/admin/receiver", messageHandler);
        })

          getListUsers().then((result) =>{
                setData(result.data);
            });
    }, []);

    const messageHandler=(e)=>
    {
        var k = JSON.parse(e.body);
       setMessage({ sender:k.sender, receiver:k.receiver, message:k.message, status:k.status});


        if(stateRefUser.current===k.sender)
        {
            var chatMessage = {
                sender:"admin",
                receiver: stateRefUser.current,
                message:"",
                status:"SEEN",
            };
            sendMessage(chatMessage);
        }

    }
    const handleRoleChange=(event) => {
       setRole(event.target.value);

    };
    const deleteUser=()=>
    {
        deleteUsers(id);
        getListUsers().then((result) =>{
            setData(result.data);
        });
    }

    const handleInsert=()=>
    {
        console.log(name);
        insertUser(name,password,role);
        getListUsers().then((result) =>{
            setData(result.data);
        });

    }

    const handleUpdate=()=>
    {
        console.log(name);
        updateUser(id, name,password,role);
        getListUsers().then((result) =>{
            setData(result.data);
        });

    }

    const handleClick =(event) =>{
        setId(event.id);
        setName(event.name);
        setPassword(event.password);
        setRole(event.rol);
        setMessage({ sender:"", receiver:"", message:"", status:"NULL"});
        var chatMessage = {
            sender:"admin",
            receiver: event.name,
            message:"",
            status:"SEEN",
        };
        sendMessage(chatMessage);

    }

    return (
        <div>
            <Navbar></Navbar>
            <AdminStyleDiv>

                <TableStyleDiv>
                    <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
                        <Table stickyHeader aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Password</TableCell>
                                    <TableCell>Rol</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow
                                        hover={true}
                                        onClick={()=> handleClick(row)}
                                        selected ={id===row.id}
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.password}</TableCell>
                                        <TableCell>{row.rol}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TableStyleDiv>
                <CRUDStyleDiv>


                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <ComponentStyleDiv>
                            <LabelStyle >Username:</LabelStyle>
                            <TextField id="filled-basic" onChange={(e)=> setName(e.target.value)} label={name} variant="filled" />
                        </ComponentStyleDiv>
                        <ComponentStyleDiv>
                            <LabelStyle>Password:</LabelStyle>
                            <TextField id="filled-basic" onChange={(e)=> setPassword(e.target.value)} label={password} variant="filled" />
                        </ComponentStyleDiv>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Age"
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                                    <MenuItem value={"USER"} >USER</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <ButtonStyle variant="contained" onClick={deleteUser}>DELETE</ButtonStyle>
                    <ButtonStyle variant="contained" onClick={handleInsert}>INSERT</ButtonStyle>
                    <ButtonStyle variant="contained" onClick={handleUpdate}>UPDATE</ButtonStyle>
                </CRUDStyleDiv>

            </AdminStyleDiv>
            <ChatAdmin
                u={name}
                message={message}
            />
        </div>



    )
}





export default Admin