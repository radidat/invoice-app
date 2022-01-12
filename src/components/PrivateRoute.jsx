import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
const PrivateRoute =({path, Component, ...props})=>{ 

     const {currentUser} = useAuth(); 
    return (<>
         {currentUser ? <Route path ={path} children ={()=><Component/>} {...props}/> : <Redirect to='/signin'/> }
    </>)
}

export default PrivateRoute;