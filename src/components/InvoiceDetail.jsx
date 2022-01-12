import React,{useState, useEffect} from 'react'; 
import { Section } from '../UI/Section';
import styled from 'styled-components'
import {Button} from '../UI/Button';
import GoBack from '../UI/GoBack';
import {AnimatedEditInvoice} from './EditInvoice';
import {Link, useParams} from 'react-router-dom'; 
import {useWindowSize} from '../helper/helper';
import {getInvoice} from '../firebaseConfig/dataBase';
import {backgroundColorStatus, colorTextStatus} from '../helper/utils';
import { db } from '../firebaseConfig/firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import {useHistory} from 'react-router-dom';
import {useDarkMode} from '../context/DarkModeContext';
const InvoiceDetail =()=>{   

    const [width, height]= useWindowSize(); 
    const [btnChange, setbtnChange] = useState(false);
    const[toggle, setToggle]= useState(false);
    const [invoice, setInvoice]=useState({});
    const history = useHistory()
    const {id} =useParams();
    const {storageMode} = useDarkMode(); 

    useEffect(()=>{
        
        if(width >= 768){ 
             setbtnChange(true);
        }else{ 
            setbtnChange(false);
        }
       },[width])

       const invoiceData = async(id)=>{ 
            
       const docSnap= await getInvoice(id); 
        if (docSnap.exists()) {
           setInvoice({id: docSnap.id, ...docSnap.data()});
          }
       }
    
       useEffect(()=>{
        
          invoiceData(id)
       },[id])


      const idInvoice = `RT${id.slice(0, 8)}`; 
    const {client, status, description, items, sender, total, paymentDue}= invoice; 
       const bg = backgroundColorStatus[status];
       const colorText= colorTextStatus[status]; 

       const onMarkPaid = async (e)=>{ 
            e.preventDefault(); 
          const docRef = doc(db, 'invoices', invoice.id); 
           const status ='paid'
            await updateDoc(docRef,{
                status:status
            });
             history.go(0);
       }

    return (<div>
        <WrapperMain>
              <GoBack/>{
                  Object.keys(invoice).length > 0 && 
             <>
            <Status checked ={true} bg={bg} colorText={colorText} darkMode={storageMode} >
                    <div className='status'>
                       <p id='opacityStatus'>status</p>
                       <div className ='checked-payment'>
                       <p><span className='point'></span>{status}</p>
                       </div>
                       <div className='btn-container-responsive'>
                            <EditButton className='btn-responsive'  onClick={()=>setToggle(toggle => !toggle)}>Edit</EditButton>    
                       { toggle && <AnimatedEditInvoice setToggle={setToggle} toggle={toggle}/> }
                <DeleteButton className='btn-responsive'>Delete</DeleteButton>
                <ConfirmButton className='btn-responsive'>Mark as paid</ConfirmButton>
                           </div>
                    </div>
                </Status>
                <WrapperInvoiceDetail height ='600px' darkMode={storageMode}>
                    <div className='id-invoice-detail'>
                        <p>#<span className='bold-id'>XM9141</span></p>
                        <p>Graphic Design</p>
                    </div>
                    {sender &&
                    <ul className='address-company'>
                    <li>{sender.street}</li>
                    <li>{sender.city}</li>
                    <li>{sender.postal_code}</li>
                    <li>{sender.country}</li>
                </ul>
                    }

                    <div className='container-payment-detail'>

                    <div className='date-payment-detail'>
                        <p>Invoice date</p>
                        <p className='payment-date'>21 Aug 2021</p>
                    </div>

                    <div className='date-payment-du'>
                        <p>Payment due</p>
                        <p className='payment-date' >{paymentDue}</p>
                    </div>

                    <div className='address-client'>
                        <p>Bill To</p>
                     <h6 className='name-client'>{client.name}</h6>
                   {client &&
                    <ul>
                    <li>{client.street}</li>
                    <li>{client.city}</li>
                    <li>{client.postal_code}</li>
                    <li>{client.country}</li>
                </ul> 
                   }
                    </div>
              
                    <div className='email-client-container'>
                        <p>Sent to</p>
                        <p className='email-client'>{client.email}</p>
                    </div>
                    </div>

                    <div className='container-total-items' style={{background : storageMode ? '#252945': '#fff'}}>
                    {items.map( item =>{
                      return  <Items key={item.id} item={item}/>
                    })}
                  
                    <div className='container-grd-total'>
                        <p>Grand total</p>
                        <p>{total}</p>
                    </div>
                    </div>
                   
                </WrapperInvoiceDetail>
                </>
              }
                
          </WrapperMain>
          < WrapperButton height='80px'darkMode={storageMode} >
          <EditButtonLink className='btn-responsive' to={`/editInvoice/${invoice.id}`}>Edit</EditButtonLink>
                <DeleteButton>Delete</DeleteButton>
                <ConfirmButton onClick={onMarkPaid}>Mark as paid</ConfirmButton>
           </WrapperButton>
        </div>)

}


 const Status  = styled(Section)`
 background: ${props =>props.darkMode  ? '#252945': '#fff' };
         .status{ 
         .btn-container-responsive{ 
             display:none;
         }
             padding: 25px 15px;
             display: flex; 
             justify-content: space-between;
             #opacityStatus {
                opacity : 0.3;
            }
            .checked-payment{
                background-color:${ props => props.bg } ;
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
                .btn-container-responsive{
                    display: flex;
          flex-direction: row;
           align-items:center;
                }
                .checked-payment{ 
                    margin-left: -25%;
                }
                #opacityStatus{
                    margin-top: 10px;
                    font-size: 16px;
                }
            }


         }
         
         
 `; 

 const Items = ({item})=>{

    return(<div className='items-container'>      
        <div className='item'>
        <p className='bold-text'>{item.itemName}</p>
        <p>{item.itemQuantity}x${item.itemPrice}</p>
        </div>
        <p className='bold-text'>{item.itemTotal}</p>
    </div>
    )
 }
 const WrapperInvoiceDetail= styled(Section)`
 background: ${props =>props.darkMode  ? '#252945': '#fff' };
              padding: 20px;
              p, li { 
                  font-size: 12px;
                  opacity: 0.3;
              }
             .id-invoice-detail{ 
                   
                    p:last-child{
                      opacity: 0.3;
                     }
                     .bold-id{ 
                         font-weight: bold;  
                     }
             }
        
             .address-company{
                margin: 25px 0px;
                li{ 
                    list-style:none;
                }
             }
            .address-client{ 
                float: right;
                transform: translateY(-115px);
                 
                .name-client{
                    font-size 15px; 
                    padding-top: 10px 
                }
                ul{ 
                    padding-top: 15px;
                }
                ul li{
                    list-style: none;
                }
            }

            .date-payment-detail, .date-payment-du{ 
            padding-top: 25px; 
            padding-bottom: 25px;
            }
            .payment-date{ 
            font-weight: bold;
            opacity: 1;
            }

    .email-client-container{
        margin-top: 15px;
        margin-bottom: 15px;

        p:first-child{
            margin-bottom: 10px;
        }

        .email-client{
            opacity: 1; 
            font-weight: bold;
        }
    }
.container-total-items{
    background-color: #F9FAFE;
}
    .items-container{
        padding: 5px 10px;
        width: 90%;
        display: flex;
        justify-content: space-between;
     margin-bottom:15px;
    }
    .bold-text{
        opacity: 1;
        font-weight: bold;
    }
    .container-grd-total{
      background-color: #373B53; 
        height: 80px;
        width: 100%; 
        color: #fff; 
        display: flex; 
        justify-content: space-between;

        p{   
            padding: 40px 20px;
            color:#fff; 
            opacity:1;
        }
    }
    
    @media only screen and (min-width: 768px){ 
       .address-company{ 
           float: right;
           text-align: right;
           margin-top: -25px;
       }
      .address-client{ 
          float:none;
          transform: translateY(0px);
      }
      .container-payment-detail{
          clear: both; 
          margin-top: 50px;
          display: flex; 
          justify-content: space-around;
          flex-wrap: wrap;
          position: relative; 
      }
      .date-payment-du{
       position: absolute; 
       top: 50px; 
       transform: translateX(-300px)

      }
    }
 `; 
 const WrapperButton = styled(Section)`
display: flex;
flex-direction: row;
align-items:center;
padding-left: 20px;
background: ${props =>props.darkMode  ? '#252945': '#fff' };
margin:50px auto 0px auto ;
@media only screen and (min-width: 768px){
   display: none;
 `; 

 const DeleteButton = styled(Button)`
 height :35px;
     width: 73px; 
     margin-right: 5px;
     background-color: #EC5757;
     color: #fff;
     font-weight: bold;
     @media only screen and (min-width: 768px){
        &.btn-responsive{ 
          height: 50px;
          width: 85px;

        }
      } 
 `
 const ConfirmButton = styled(Button)`
     height :45px; 
     width: 125px; 
     margin-right: 5px;
     background-color: #7C5DFA;
     color: #fff;
     font-weight: bold;
     @media only screen and (min-width: 768px){
        &.btn-responsive{ 
          height: 50px;
          width: 135px;
        }
      } 
     
 `
 const EditButtonLink = styled(Link)`
     height :35px;
     width: 73px; 
     text-decoration:none;
     border-radius: 25px;
     background-color:#F9FAFE;
     color: #7C5DFA;
     font-weight: bold;
     margin-right: 5px;

     @media only screen and (min-width: 768px){
        &.btn-responsive{ 
          height: 50px;
          width: 65px;


        }
      }
     
 ` 
 const EditButton = styled(Button)`
 height :35px;
 width: 73px; 
 background-color:#F9FAFE;
 color: #7C5DFA;
 font-weight: bold;
 margin-right: 5px;

 @media only screen and (min-width: 768px){
    &.btn-responsive{ 
      height: 50px;
      width: 65px;


    }
  }
 
`
 const WrapperMain = styled.div`
     margin: 0 15px;
     @media only screen and (min-width: 1024px){ 
        margin: 20px 20%;
    }
 `; 

export default InvoiceDetail; 
