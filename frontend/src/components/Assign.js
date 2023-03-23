import React, {useEffect, useState} from 'react'
import Navbar from "./Navbar";
import {
    AdminStyleDiv,
    ButtonStyle,
    ComponentStyleDiv,
    LabelStyle,
    MiddleAllignDiv,
    TableStyleDiv
} from "../styles/Assign.style";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {AssignUser, deleteDevice, getListDevices, getListDevicesUnassigned} from "../services/DeviceService";
import {assign, getListUsers, getUsers} from "../services/UserService";
import {useNavigate} from "react-router-dom";

function Assign() {

    let red=useNavigate();
    const [idDevice, setIdDevice]=useState();
    const[devices, setDevices]= useState([]);
    const[allDevices, setAllDevices]=useState([]);
    const[data, setData]= useState([]);
    const [idUser, setIdUser]=useState();
    const[user, setUser]=useState("");
    let person= JSON.parse(localStorage.getItem('person'));


    useEffect(() => {

        if(user.rol== "USER")
        {
            red("/");
        }
        getListDevices().then((result) =>{
            setAllDevices(result.data);
        });
        getListDevicesUnassigned().then((result) =>{
            setDevices(result.data);
        });
        getUsers().then((result) =>{
            setData(result.data);
        });
    }, []);



    const handleClick =(event) =>{
        setIdDevice(event.id);

    }
    const handleClick1 =(event) =>{
        setIdUser(event.id);


    }
    const handleAssign=()=>
    {
        AssignUser(idUser,idDevice);
        getListDevicesUnassigned().then((result) =>{
            setDevices(result.data);
        });
    }
    return (
        <div>
            <Navbar></Navbar>
            <AdminStyleDiv>
                <TableStyleDiv id={"first-tab"}>
                    <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
                        <Table stickyHeader aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>MaxConsumption</TableCell>
                                    <TableCell>User</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {devices.map((row, index) => (
                                    <TableRow
                                        hover={true}
                                        onClick={()=> handleClick(row)}
                                        selected ={idDevice===row.id}
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.maxConsumtion}</TableCell>
                                        <TableCell>{row.user}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TableStyleDiv>

            <TableStyleDiv>
                <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
                    <Table stickyHeader aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>Role</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    hover={true}
                                    onClick={()=> handleClick1(row)}
                                    selected ={idUser===row.id}
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
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

            </Box>
                <MiddleAllignDiv>
                    <ButtonStyle variant="contained" onClick={handleAssign}>ASSIGN</ButtonStyle>
                </MiddleAllignDiv>

            </AdminStyleDiv>
        </div>
    )
}

export default Assign