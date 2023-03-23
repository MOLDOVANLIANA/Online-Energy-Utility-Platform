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
                    <NavLink to='/User/Chat' activestyle={"true"}>
                        <NavText>CHAT</NavText>
                    </NavLink>
                </NavMenu>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}

                <NavBtn>
                    <NavBtnLink onClick={logOut} to='../'><NavText>
                        LOG OUT</NavText></NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;