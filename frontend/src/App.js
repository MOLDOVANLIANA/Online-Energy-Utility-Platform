import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import User from "./components/User";
import Device from "./components/Device";
import Assign from "./components/Assign";
import ChatAdmin from "./components/ChatAdmin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/Admin"} element={<Admin/>}/>
                <Route path={"/User"} element={<User/>}/>
                <Route path={"/Admin/Device"} element={<Device/>}/>
                <Route path={"/Admin/Assign"} element={<Assign/>}/>
                <Route path={"/Admin/Chat"} element={<ChatAdmin  />}/>
            </Routes>
        </Router>
    );

}
export default App;
