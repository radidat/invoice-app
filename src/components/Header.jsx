import React, {useState, useCallback} from 'react'; 
import styled from 'styled-components'; 
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {Button} from '../UI/Button'; 
import {useDarkMode} from '../context/DarkModeContext'
function Header(){ 

    const [showProfile, setShowProfile] = useState(false); 
    const {userData} = useAuth();
    const {mode, setMode, storageMode}= useDarkMode(); 

    const onDarkMode =(e)=>{ 
          e.preventDefault();
          setMode(true) 
           if(mode ===false){
               setMode(true)
           }
           if(mode ===true){
               setMode(false)
           }
    }
    console.log(storageMode)
    return <WrapperHeader>
              <div className='btn-open'>
                <Link to='/'>
                    <img src='/assets/logo.svg'alt='logo'/>
                </Link>
              </div>

             <div className='container-avtr-dk'>
              <div className='dark-mode' onClick={onDarkMode} >
                  <img src={`/assets/${storageMode ?'icon-sun.svg' : 'icon-moon.svg' } `}alt='dark-mode'/>
              </div>
              <div className='avatar'>
                 <Button onClick={()=> setShowProfile(!showProfile)}><img src={userData.photoURL} alt='avatar'/></Button>
                  {showProfile && <Setting setShowProfile={setShowProfile} showProfile={showProfile}/>}
                 </div> 
            <div>

              </div>
             </div>
    </WrapperHeader>
}
const Setting =({setShowProfile, showProfile})=>{

    const {onSignOut} = useAuth();

    const logout = async()=>{
        setShowProfile(!showProfile);
        await onSignOut();
}
    return(<WrapperSetting>
           <div>
            <Link to='/profileUser' onClick={()=> setShowProfile(!showProfile)} >profile parameter </Link>
           <Button onClick ={logout}>log out</Button>
           </div>
    </WrapperSetting>)
}
const WrapperSetting= styled.div`
   position:absolute; 
   z-index: 5; 
   background-color: #fff;
   border-radius: 5px;
   width:150px;
   height: 90px;
   top: 35px; 
   transform: translateX(-125px);
   box-shadow: 1px 1px 12px rgba(0,0,0,0.2);

   div{ 
       margin-top: 20px;
       text-align:center;
       color: #373B53;
   }
   a{
   color: inherit;
   }

   button{
       border-top: 1px solid #373B53;
       border-radius: 0px;
       padding-top:8px;
       width: 100%; 
   color: inherit;
       margin-top:15px;
       font-size: 16px;
   }
   
   @media only screen and (min-width: 1024px){ 
    top:10px;
    left:-50px;
    height: 100px;
     transform: translateX(150px);
   }
`; 

 const WrapperHeader = styled.header`
    width: 100%; 
    height: 72px;
    background-color: #373B53;
    position: relative;
    display: flex; 
    justify-content: space-between; 
    flex-direction: row;
   
    .container-avtr-dk{ 
        display: flex; 
        justify-content: space-around;
        transform: translateY(20px);
    }
    .avatar{ 
        margin: 0 25px;
        border-left: 1px solid #979797;
        margin-top: -20px;
        height:70px;
    
    }
     .avatar img{
         margin-top: 15px;
         margin-left:25px;
         width: 32px; 
         height :32px;
         border-radius: 50%;   
     }
    .btn-open{
        background-color: #7C5DFA;
        height: 72px; 
        width: 72px;
        border-top-right-radius: 40%; 
        border-bottom-right-radius: 40%; 
        position: relative;
    }
    .btn-open::after{
        content:'';
        z-index:1;   
        position:absolute;
        background-color:#fff;
        transform: translate(-44px, 40px);
        opacity: 0.2;    
        height: 37px;      
        width: 72px; 
        border-top-left-radius: 40%; 
        border-bottom-left-radius: 40%;  
        border-bottom-right-radius: 100%; 
    }
    .btn-open a{        
        z-index:2;
        text-decoration:none;
    border: none; 
    outline: none;
    background: none;
    padding-left: 15px;
    }
    .btn-open a img{
        display:inline-block;
        margin: 25px auto;
    }
    @media only screen and (min-width: 1024px){ 
        width: 110px; 
        height:100%;
        z-index: 1;
        margin-bottom: 0;
        position:fixed; 
        top:0;
        bottom:0;
        display: flex; 
        flex-direction: column;
        align-item: center;
        border-top-right-radius: 25px;  
        border-bottom-right-radius: 25px;  
    .container-avtr-dk{
        display: block; 
        height:150px;
        
    }
    .avatar{ 
        margin:0px;
        padding: 10px;
        border-top: 1px solid #979797;
        border-left: none;
    
    }
  
    .dark-mode{
        padding: 0px 15px 25px 40px ;
    }
 .btn-open{
        height: 110px; 
        width: 110px;
        border-top-right-radius: 25px; 
        border-bottom-right-radius: 15px; 
    }
    .btn-open::after{  
        height: 60px;      
        width: 110px; 
        transform: translate(-55px, 50px);
        margin-right: 50px;
        border-top-left-radius: 40%; 
        border-bottom-left-radius:0;  
        border-bottom-right-radius: 15px; 
    }
    .btn-open a{        
        z-index:2;
    border: none; 
    outline: none;
    background: none;
    padding-left: 15px;
    }
    .btn-open a img{
        width:40px;
        transform :translate(15px, 5px);
        height:37px;
    }

}

`; 


export default Header; 