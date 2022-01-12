import React from 'react'; 
import styled from 'styled-components'
import {Link} from 'react-router-dom'; 


const GoBack = ({to, ...props})=>{ 

return(<WrapperGoBack {...props}>
    <Link to={to ? to : '/'}>
       <img src='/assets/icon-arrow-left.svg' alt='arrow-left'/>
       <p>Go back</p>
       </Link>
</WrapperGoBack>)
}

const WrapperGoBack = styled.div`
     display: flex; 
      padding-top: 40px; 
      margin-left: 15px;
      cursor:pointer;
     a{
         text-decoration: none; 
     }
      a:active{ 
          color: inherit;
      }
     p{ 
        font-size:12px;
        font-weight:bold;
        margin-top: -16px;
        margin-left: 15px;
     }

     @media only screen and (min-width: 768px){ 
         &.goBackForm{ 
               display: none;
         }
     }
`
export default GoBack;