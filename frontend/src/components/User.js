import React, {useEffect, useState} from 'react'
import {TableStyleDiv} from "../styles/Assign.style";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getUsersDevices} from "../services/DeviceService";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {ButtonStyle} from "../styles/Assign.style";
import {format} from "date-fns";
import {getConsumption} from "../services/ConsumptionService";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Navbar from "../components/Navbar_User"
import {useNavigate} from "react-router-dom";
import Chat from "./Chat";
function User() {
    let red=useNavigate();
    const[devices, setDevices]= useState([]);
    const[data,setData]=useState(new Date());
    const[idDevice, setIdDevice]=useState("");
    const[rez, setRez]=useState("");

    let user= JSON.parse(localStorage.getItem('person'));


      useEffect(() => {

          if(user==null)
          {
              red("/");
          }
          else
          {
              getUsersDevices(user.id).then((result) =>{
                  setDevices(result.data);

              });
          }

      }, []);
    const handleClick =(event) =>{
         setIdDevice(event.id);

    }
    const handleChart=(e)=>
    {
        const aux=format(new Date(data.getFullYear(), data.getMonth().toFixed(),data.getDate()), 'yyy-MM-dd');
        console.log(aux);
        console.log(idDevice);
        getConsumption(idDevice, aux).then((result) =>
        {
           setRez(result.data);
           console.log(rez);
        });
    }

    return (
        <div className={'main'}>
            <Navbar></Navbar>
            <div className={'container'}>
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
                                        selected ={idDevice===row.id}
                                        onClick={()=> handleClick(row)}
                                        key={row.id}
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
                <div className={'calendar-container'}>
                    <Calendar onChange={setData} value={data} />
                    <ButtonStyle variant="contained" onClick={handleChart}>SHOW CHART</ButtonStyle>
                </div>

            </div>

            <LineChart  width={1000} height={200} data={rez}>
                <Line type="monotone" dataKey="energyConsumed" stroke="#2196F3" strokeWidth={3} />

                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis dataKey="energyConsumed"/>
                <Tooltip />
                <Legend />
            </LineChart>
            <Chat />
        </div>

    )
}

export default User