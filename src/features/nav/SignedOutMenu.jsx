import React from 'react';
import { Menu,Button } from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
export default function SignedOutMenu({setAuthenticated}) {
    return (
        <Menu.Item position="right"> 
        <Router>
                <Button onClick={() => setAuthenticated(true)} basic inverted center content="Login" />
                <Button  basic inverted center content="Register" 
                style={{marginLeft: '0.5em'}} />
        </Router>
        </Menu.Item>
    )
    
}