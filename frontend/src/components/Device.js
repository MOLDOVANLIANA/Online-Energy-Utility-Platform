import React, {useEffect, useState} from 'react'
import {
    AdminStyleDiv,
    ComponentStyleDiv,
    CRUDStyleDiv,
    LabelStyle,
    TableStyleDiv
} from "../styles/Admin.style";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {ButtonStyle} from "../styles/Assign.style";
import {deleteDevice, getID, getListDevices, insertDevice, updateDevice} from "../services/DeviceService";
import Navbar from "../components/Navbar"
import {useNavigate} from "react-router-dom";
function Device()
{
    let red=useNavigate();
    const [id, setId]=useState("");
    const[description, setDescription]=useState("");
    const[address, setAddress]=useState("");
    const[maxConsumption, setMaxConsumption]= useState();
    const[devices, setDevices]= useState([]);
    const[user, setUser]=useState("");
    let person= JSON.parse(localStorage.getItem('person'));
    useEffect(() => {
        if(user.rol== "USER")
        {
            red("/");
        }
        getListDevices().then((result) =>{
            setDevices(result.data);
        });
    }, []);

    const setField=()=>
    {
        setDescription("");
        setAddress("");
        setMaxConsumption();
    }
    const handleDelete=()=>
    {

        deleteDevice(id);
        setField();
         getListDevices().then((result) =>{
             setDevices(result.data);
         });
    }

    const handleInsert=()=>
    {

        insertDevice(description,address,maxConsumption);
        getListDevices().then((result) =>{
            setDevices(result.data);
        });

    }

    const handleUpdate=()=>
    {

        updateDevice(id, description,address,maxConsumption,user);
        getListDevices().then((result) =>{
            setDevices(result.data);
        });

    }

    const handleListen =()=>
    {
        getID(id);
    }
    const handleClick =(event) =>{
         setId(event.id);
         setDescription(event.description);
         setAddress(event.address);
         setMaxConsumption(event.maxConsumtion);
         setUser(event.user);
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
                                        key={row.id}
                                        selected ={id===row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.maxConsumtion}</TableCell>
                                        <TableCell>{(row.user==null) ? ("null") :  (row.user.name)}</TableCell>
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
                            <LabelStyle >Description:</LabelStyle>
                            <TextField id="filled-basic" onChange={(e)=> setDescription(e.target.value)} label={description} variant="filled" />
                        </ComponentStyleDiv>
                        <ComponentStyleDiv>
                            <LabelStyle>Address:</LabelStyle>
                            <TextField id="filled-basic" onChange={(e)=> setAddress(e.target.value)} label={address} variant="filled" />
                        </ComponentStyleDiv>
                        <ComponentStyleDiv>
                            <LabelStyle>MaxConsumption:</LabelStyle>
                            <TextField id="filled-basic" onChange={(e)=> setMaxConsumption(e.target.value)} label={maxConsumption} variant="filled" />
                        </ComponentStyleDiv>

                    </Box>
                    <ButtonStyle variant="contained" onClick={handleDelete}>DELETE</ButtonStyle>
                    <ButtonStyle variant="contained" onClick={handleInsert}>INSERT</ButtonStyle>
                    <ButtonStyle variant="contained" onClick={handleUpdate}>UPDATE</ButtonStyle>
                    <ButtonStyle variant="contained" onClick={handleListen}>LISTEN</ButtonStyle>
                </CRUDStyleDiv>

            </AdminStyleDiv>
        </div>

    )
}

export default Device