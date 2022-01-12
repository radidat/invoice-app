import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';



const DisplayHeader=()=>{
 const location = useLocation();
 const [display,setDisplay ] = useState(false);

 useEffect(()=>{
   if(location.pathname ==='/signin'|| location.pathname ==='/signup' ||location.pathname ==='/changePassword'){
    setDisplay(false);
   }else{
       setDisplay(true)
   }
 },[location])

    return( <>
    { display && <Header/>}
    </> 
    )
}

export default DisplayHeader