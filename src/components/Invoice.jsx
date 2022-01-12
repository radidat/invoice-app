import React from 'react'
import styled from 'styled-components'; 
import {Link} from 'react-router-dom';
import {backgroundColorStatus, colorTextStatus} from '../helper/utils';
import {useDarkMode} from '../context/DarkModeContext';
function Invoice({invoice}) {
       

    const {storageMode} = useDarkMode(); 
const { id, status, client, paymentDue, total } =invoice;


const idInvoice = `RT${id.slice(0, 8)}`; 
const {name} = client; 

const bg = backgroundColorStatus[status];
const colorText= colorTextStatus[status];

    return (
        <WrapperInvoice bg={bg} colorText ={colorText} darkMode={storageMode}>
            <Link to={`/invoiceDetail/${id}`}>
            <div className='container-mobile  '>
            <div className='id-invoice'>
                <p>#<span>{idInvoice}</span></p>
                <p className='name-avatar'></p>
            </div>
            <div className='date-payment'>
            <div className='amount'>
            <p className='amount-date'>{name}</p>
            <p>${total} </p>
            </div>
            <div className='checked-payment'>                     
       { status && <p><span className='point'></span>{status}</p>}
            </div>
            </div>
            </div>
          </Link>
        </WrapperInvoice>
    )
}


const WrapperInvoice = styled.div`

   .container-tablet-desktop{
    display: none;
   }
   a{
       text-decoration: none; 
       color: ${props =>props.darkMode  ? 'white': 'black' };
   }
   a:active{
       color:inherit;
   }
   background: ${props =>props.darkMode  ? '#252945': '#fff' };
    height: 127px;
    margin: 20px 10px;
    cursor: pointer; 
    border-radius: 5px;
    border:none;
    transition: all 0.1s ease-out;
    &:hover{
       border: 1px solid #7C5DFA;
    }
    .id-invoice{
        font-size:12px;
        padding-top:20px;
        margin-inline:15px;
        display: flex; 
        justify-content: space-between; 
        p span{ 
            font-weight: bold;
        }
        .name-avatar{
            opacity: 0.3;
           
        }
    }
    .date-payment{
        display: flex;
        margin-top: 25px;
         justify-content: space-around;
    }
   .amount{
       p.amount-date{
           opacity: 0.3; 
           font-size: 12px;
       }
      p{ 
          font-size: 16px; 
          font-weight: bold;
      }
    }
    .checked-payment{
        background-color:${(props)=> props.bg} ;
        padding: 5px 20px;
        color: ${props=>props.colorText}; 
        p{ 
            font-weight:500;
        }
        .point{
            display:inline-block; 
            background-color:${props=>props.colorText};
            border-radius: 50%; 
            margin-top: 15px;
            margin-right: 10px;
            width: 6px; 
            height: 6px;
        }
    }

   @media only screen and (min-width: 768px){
    height: 72px;
    .container-mobile{
        display: none;
    }
       .container-tablet-desktop{
          display: flex;
          justify-content: space-around; 
          align-items: center;
          padding-top: 20px;
       }
       .name-avatar, .amount-date{ 
            opacity: 0.3;
       }
      .strong{
          font-weight:bolder;
      }

   @media only screen and (min-width: 1024px){ 
       margin: 20px 20%;
}
   }
`

export default Invoice
