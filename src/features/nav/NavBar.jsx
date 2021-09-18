import react from 'react';
import { Menu } from 'semantic-ui-react';

export default function NavBar() {
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" />
                Re-vents
            </Menu.Item>
            <Menu.Item name='Events' />
            <Menu.Item>
                <Button  positive inverted center content="Create Event" />
            </Menu.Item>
            <Menu.Item position="right"> 
                <Button  basic inverted center content="Login" />
                <Button  basic inverted center content="Register" style={{marginLeft: '0.5em'}} />
            </Menu.Item>
            
        </Container>
    </Menu>
}