import React from 'react'; 
import styled from 'styled-components'; 


const NothingInvoice =()=>{ 


    return (<WrapperNothingInvoice>
              <div>
                  <img src='/assets/illustration-empty.svg' alt='illustration-empty'/>
                  <div>
                      <h1>There nothing here</h1>
                      <p>
                      Create an invoice by clicking the 
                     New button and get started
                      </p>
                  </div>
              </div>
    </WrapperNothingInvoice>)
}

const WrapperNothingInvoice = styled.div`

margin: 150px auto; 
text-align: center;
 img{
     display: block;
     height:160px; 
     width: 193px;
     margin: 0 auto;
 }
 h1{
     font-size:20px; 
     margin-bottom:15px;
    
 }
 p{
    opacity: 0.3; 
    font-size: 12px;
 }

 @media only screen and (min-width: 768px){ 
    img{
         height:400px; 
        width: 400px;
    }
    h1{
        font-size:32px; 

    }
    p{
        font-size: 20px;
     }
 }

`

export default NothingInvoice; 