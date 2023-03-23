import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink, NavText,
} from '../styles/Navbar.style';

const Navbar = () => {
    const logOut=()=>
    {
        localStorage.clear();
    }
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to='/Admin' activestyle={"true"}>
                        <NavText>USER</NavText>
                    </NavLink>
                    <NavLink to='/Admin/Device' activestyle={"true"}>
                        <NavText>DEVICE</NavText>
                    </NavLink>
                    <NavLink to='/Admin/Assign' activestyle={"true"}>
                        <NavText>
                           ASSIGN
                        </NavText>
                    </NavLink>


                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink onClick={logOut} to='../'><NavText>
                        LOG OUT</NavText></NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;