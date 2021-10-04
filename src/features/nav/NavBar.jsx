import React, {useState} from 'react';
import { Menu,Container,Button } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  import { useHistory } from "react-router-dom";


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
        </Container>
    </Menu>
    )
}