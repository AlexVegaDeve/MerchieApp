import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Container, Navbar, Nav, } from 'react-bootstrap';
import axios from 'axios';

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const history = useHistory();

    const logoutHandler = () => {
        axios.get('/api/v1/users/logout' )
        .catch((error) => {
            console.log(error);
        });
        sessionStorage.clear();   // clear user session from local storage
        localStorage.setItem('message', 'You have been logged out');
        history.push('/login')
        window.location.reload()
    }

    let userSession = JSON.parse(sessionStorage.getItem('userInfo'))

        return(
            <div className="nav-cont py-3">
                <Navbar bg="light" expand="lg" fixed="top" className="my6" expanded={expanded}>
                <Container>                   
                    <NavLink className="navbar-brand" to="/" onClick={() => setExpanded(false)}><img src="https://images-na.ssl-images-amazon.com/images/S/influencer-profile-image-prod/logo/linustechtips_1591290016756_original._CR0,0,600,600_._FMjpg_.png" alt="lttlogo" className="bannerImg"></img></NavLink>                                        
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={() => setExpanded(expanded ? false : "expanded")}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <NavLink to="/" className="nav-link" activeClassName="active" onClick={() => setExpanded(false)}>View Merch </NavLink>
                    {userSession !== null && userSession.isAdmin && <NavLink to="/addProduct" className="nav-link create" activeClassName="active" onClick={() => setExpanded(false)}>Add Merch </NavLink>}
                    </Nav>
                    <Nav className="justify-content">
                    <NavLink to="/myCart" className="nav-link" activeClassName="active" onClick={() => setExpanded(false)}><i className='fas fa-shopping-cart'/> Cart </NavLink>
                    {!userSession && <NavLink to="/register" className="nav-link" activeClassName="active" onClick={() => setExpanded(false)}> <i className="fa-solid fa-bars"/> Register </NavLink>}
                    <NavLink disabled to="/login"   className={userSession ? 'nav-link disabled': 'nav-link'} activeClassName="active" onClick={() => setExpanded(false)}><i className={userSession ? '' : 'fas fa-user'}/>{userSession ? `Hello, ${userSession.username}` : 'Login'}</NavLink>
                    {userSession && <NavLink to="/myAccount" className="nav-link" activeClassName="active" onClick={() => setExpanded(false)}><i className="fas fa-person"/> My Account </NavLink>}
                    {userSession && <Nav.Item onClick={logoutHandler} className="nav-link" >Logout</Nav.Item> }                                                                                             
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
        )
    }

export default NavBar;