import React from 'react';
import { Menu,Button } from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { openModal } from '../../app/common/modals/modalReducer';

export default function SignedOutMenu({setAuthenticated}) {
    const dispatch = useDispatch();
    return (
        <Menu.Item position="right"> 
        <Router>
                <Button onClick={() => dispatch(openModal({modalType: 'LoginForm' }))} basic inverted center content="Login" />
                <Button  basic inverted center content="Register" 
                style={{marginLeft: '0.5em'}} />
        </Router>
        </Menu.Item>
    )
    
}