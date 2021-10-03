import React, {useState} from 'react';
import { Menu,Container,Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
export default function NavBar({setFormOpen}) {


    return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} to='/' header>
                <img src="/assets/logo.png" alt="logo" />
                Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} exact to='events' name='Events' />
            <Menu.Item as={NavLink} to='/createEvent'>
                <Button onClick={() => setFormOpen(true)} positive inverted center content="Create Event" />
            </Menu.Item>
            <Menu.Item position="right"> 
                <Button  basic inverted center content="Login" />
                <Button  basic inverted center content="Register" 
                style={{marginLeft: '0.5em'}} />
            </Menu.Item>
            
        </Container>
    </Menu>
    )
}