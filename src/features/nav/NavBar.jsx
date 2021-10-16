import React, {useState} from 'react';
import { Menu,Container,Button } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import {
    BrowserRouter as Router,
    Link,
    NavLink
  } from "react-router-dom";
  import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function NavBar({setFormOpen}) {
    const {authenticated} = useSelector(state => state.auth);


    return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} exact to='/' header>
                <img src="/assets/logo.png" alt="logo" />
                Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} exact to='/events/' name='Events' />
            <Menu.Item as={NavLink} exact to='/sandbox/' name='Sandbox' />
        {authenticated &&
        <Menu.Item>
            <Button as={Link} to={`/createEvent/`} positive inverted center content="Create Event" />
        </Menu.Item>}
        {authenticated 
        ? (<SignedInMenu /> )
        : (<SignedOutMenu  />)
        }
        </Container>
    </Menu>
    )
}