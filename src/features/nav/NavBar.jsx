import React, {useState} from 'react';
import { Menu,Container,Button } from 'semantic-ui-react';
<<<<<<< HEAD
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  import { useHistory } from "react-router-dom";

=======
import { NavLink } from 'react-router-dom';
>>>>>>> 5d005b5181a3f9937a0761e14089244a3895f95a
export default function NavBar({setFormOpen}) {
    const history = useHistory();
    const [authenticated,setAuthenticated] = useState(false);

    function handleSignOut() {
        
        setAuthenticated(false);
        history.push('/');
    }

    return (
    <Menu inverted fixed='top'>
        <Container>
<<<<<<< HEAD
            <Router>
            <Menu.Item as={Link} exact to='/' header>
                <img src="/assets/logo.png" alt="logo" />
                Re-vents
            </Menu.Item>
            <Menu.Item as={Link} name='Events' />
            </Router>
        {authenticated &&
        <Menu.Item>
            <Button onClick={() => setFormOpen(true)} positive inverted center content="Create Event" />
        </Menu.Item>}
        {authenticated 
        ? (<SignedInMenu signOut={handleSignOut} /> )
        : (<SignedOutMenu setAuthenticated={setAuthenticated} />)
        }
=======
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
            
>>>>>>> 5d005b5181a3f9937a0761e14089244a3895f95a
        </Container>
    </Menu>
    )
}