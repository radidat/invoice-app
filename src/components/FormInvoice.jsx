import React,{useState, useEffect, useRef, useCallback} from 'react'; 
import {Input} from '../UI/Input';
import styled from 'styled-components';
import GoBack from '../UI/GoBack';
import { v4 as uuidv4 } from 'uuid';
import {getInvoice} from '../firebaseConfig/dataBase';
import {useDarkMode} from '../context/DarkModeContext';

 export const FormEditInvoice =({title, goBack, editInvoice, onChange, onChangeItem})=>{ 

  const { paymentDue,description,paymentTerms,clientName,clientEmail,
    status, senderAddressStreet, senderAddressCity,senderAddressPostalCode,
    senderAddressCountry,clientAddressStreet,clientAddressCity,
    clienttAddressPostalCode,clientAddressCountry,items,
    total} = editInvoice;
    const {storageMode} = useDarkMode(); 
return (<WrappeFormInvoice darkMode={storageMode}>
    <GoBack className='goBackForm' to={goBack}/>
         <div className='form-container'>
             <h1>{title}</h1>
             <div className='bill-company-client'>
                 <h5>Bill from</h5>
                 <div>
                     <label htmlFor='streetAddress'> Street address</label>
                     <Input type='text' name='senderAddressStreet' value={senderAddressStreet} onChange={(e)=>onChange(e)}darkMode={storageMode}  />
                    
                 </div>

                 <div className='city-postal' >   
                 <div >
                     <label htmlFor='city'>City</label>
                     <Input  type='text' name='senderAddressCity' value={senderAddressCity} onChange={(e)=>onChange(e)}  className='input-medium' darkMode={storageMode}/>
                    
                 </div>
                 <div>
                     <label htmlFor='postalCode'>postal code</label>
                     <Input type='number' name='senderAddressPostalCode' value={senderAddressPostalCode} onChange={(e)=>onChange(e)} className='input-medium' darkMode={storageMode} />
                    
                 </div>

                 </div>
                  <div>
                     <label htmlFor='country'>Country</label>
                     <Input type='text' name='senderAddressCountry' value={senderAddressCountry} onChange={(e)=>onChange(e)}darkMode={storageMode}  />
                    
                 </div>
             </div>

             <div className='bill-company-client'>
                 <h5>Bill to</h5>
                 <div>
                     <label htmlFor='clientName'>client's Name</label>
                     <Input type='text' name='clientName' value={clientName} onChange={(e)=>onChange(e)} darkMode={storageMode} />
                    
                 </div>
                 <div>
                     <label htmlFor='clientEmail'> client's Email</label>
                     <Input type='text' name='clientEmail' value={clientEmail} onChange={(e)=>onChange(e)} darkMode={storageMode} />
                    
                 </div>
                 <div>
                     <label htmlFor='streetAddress'> Street address</label>
                     <Input type='text' name='clientAddressStreet' value={clientAddressStreet} onChange={(e)=>onChange(e)} darkMode={storageMode}  />
                    
                 </div>
                 <div className='city-postal' >   
                 <div >
                     <label htmlFor='city'>City</label>
                     <Input type='text' name='clientAddressCity' value={clientAddressCity} onChange={(e)=>onChange(e)} className='input-medium'darkMode={storageMode} />
                    
                 </div>
                 <div>
                     <label htmlFor='postalCode'>postal code</label>
                     <Input type='number' name='clienttAddressPostalCode' value={clienttAddressPostalCode} onChange={(e)=>onChange(e)}  className='input-medium'darkMode={storageMode} />
                    
                 </div>

                 </div>
                  <div>
                     <label htmlFor='country'>Country</label>
                     <Input type='text' name='clientAddressCountry' value={clientAddressCountry} onChange={(e)=>onChange(e)} darkMode={storageMode} />
                    
                 </div>
                 <div>
                     <label htmlFor='InvoiceDate'>Invoice Date</label>
                     <Input type='text' name='paymentDue' value={paymentDue} onChange={(e)=>onChange(e)} darkMode={storageMode}/>
                    
                 </div>
                 <div>
                     <label htmlFor='paymentTerms'>Payment terms</label>
                     <Input type='text' name='paymentTerms' value={paymentTerms} onChange={(e)=>onChange(e)} darkMode={storageMode} />
                    
                 </div>
                 <div>
                     <label htmlFor='projectDescription'>Project description</label>
                     <Input type='text' name='description' value={description} onChange={(e)=>onChange(e)}  darkMode={storageMode} />
                    
                 </div>
             </div>

             <div className='bill-company-client'>
        <h5 className='text-size'>Item list</h5>
        {items.map((item,index)=>(
            <ItemNameEdit key={item.id} 
             item ={item} onChangeItem={onChangeItem} />
           ))}
        </div>
        <div className='addNewItem'>
               <button type='button' >
                <img src='/assets/icon-plus.svg' alt='icon-plus'/>
                <span>add New Item</span>
               </button>
             </div>
         </div>
</WrappeFormInvoice>)
}

 export const FormNewInvoice =React.forwardRef(({title, goBack, onRemoveItem, newInvoice, setNewInvoice, onAddItem, onNewInvoiceChange ,onItemChange,onItemTotal}, refTotal)=>{ 

const {paymentDue,description,paymentTerms,clientName,clientEmail,senderAddressStreet, 
    senderAddressCity,senderAddressPostalCode,senderAddressCountry,clientAddressStreet,
    clientAddressCity,clienttAddressPostalCode,clientAddressCountry} = newInvoice;

    const {storageMode} = useDarkMode(); 


    function addItem(e){ 
        return onAddItem(e);
    }
   
    return (<WrappeFormInvoice darkMode={storageMode} >
        <GoBack className='goBackForm' to={goBack}/>
             <div className='form-container'>
                 <h1>{title}</h1>
                 <div className='bill-company-client'>
                     <h5>Bill from</h5>
                     <div>
                         <label htmlFor='streetAddress'> Street address</label>
                         <Input type='text' name='senderAddressStreet' value={senderAddressStreet} onChange={(e)=> onNewInvoiceChange(e)} autoComplete="off" required darkMode={storageMode}/>
                        
                     </div>
    
                     <div className='city-postal' >   
                     <div >
                         <label htmlFor='city'>City</label>
                         <Input  type='text' name='senderAddressCity' value={senderAddressCity} className='input-medium'onChange={(e)=> onNewInvoiceChange(e)} autoComplete="off" required darkMode={storageMode}  />
                        
                     </div>
                     <div>
                         <label htmlFor='postalCode'>Postal code</label>
                         <Input type='text' name='senderAddressPostalCode' value={senderAddressPostalCode} className='input-medium' onChange={(e)=> onNewInvoiceChange(e)} required darkMode={storageMode} />
                        
                     </div>
    
                     </div>
                      <div>
                         <label htmlFor='country'>Country</label>
                         <Input type='text' name='senderAddressCountry' value={senderAddressCountry} onChange={(e)=> onNewInvoiceChange(e)} required darkMode={storageMode} />
                        
                     </div>
                 </div>
    
                 <div className='bill-company-client'>
                     <h5>Bill to</h5>
                     <div>
                         <label htmlFor='clientName'>client's Name</label>
                         <Input type='text' name='clientName' value={clientName}  onChange={(e)=> onNewInvoiceChange(e)} required darkMode={storageMode} />
                        
                     </div>
                     <div>
                         <label htmlFor='clientEmail'> client's Email</label>
                         <Input type='text' name='clientEmail' value={clientEmail} onChange={(e)=> onNewInvoiceChange(e)}  required darkMode={storageMode} />
                        
                     </div>
                     <div>
                         <label htmlFor='streetAddress'> Street address</label>
                         <Input type='text' name='clientAddressStreet' value={clientAddressStreet} onChange={(e)=> onNewInvoiceChange(e)} required darkMode={storageMode} />
                        
                     </div>
                     <div className='city-postal' >   
                     <div >
                         <label htmlFor='city'>City</label>
                         <Input type='text' name='clientAddressCity' value={clientAddressCity} onChange={(e)=> onNewInvoiceChange(e)}  className='input-medium' requied darkMode={storageMode} />
                        
                     </div>
                     <div>
                         <label htmlFor='postalCode'>Postal code</label>
                         <Input type='number' name='clienttAddressPostalCode' value={clienttAddressPostalCode} onChange={(e)=> onNewInvoiceChange(e)} className='input-medium' required darkMode={storageMode} />
                        
                     </div>
    
                     </div>
                      <div>
                         <label htmlFor='country'>Country</label>
                         <Input type='text' name='clientAddressCountry' value={clientAddressCountry}onChange={(e)=> onNewInvoiceChange(e)} required darkMode={storageMode}/>
                        
                     </div>
                     <div>
                         <label htmlFor='InvoiceDate'>Invoice Date</label>
                         <Input type='date' name='paymentDue' value={paymentDue} onChange={(e)=> onNewInvoiceChange(e)}  required darkMode={storageMode} />
                        
                     </div>
                     <div>
                         <label htmlFor='paymentTerms'>Payment terms</label>
                         <Input type='date' name='paymentTerms' value={paymentTerms} onChange={(e)=> onNewInvoiceChange(e)} required  darkMode={storageMode}/>
                        
                     </div>
                     <div>
                         <label htmlFor='description'>Project description</label>
                         <Input type='text' name='description' value={description} onChange={(e)=> onNewInvoiceChange(e)} required darkMode={storageMode} />
                        
                     </div>
                 </div>
                 <div className='bill-company-client'>
            <h5 className='text-size'>Item list</h5>
            {newInvoice.items.map((item,index)=>(
            <ItemName key={item.id} 
             item ={item} onRemoveItem={onRemoveItem}
             refTotal={refTotal}
               onItemChange={onItemChange}onItemTotal={onItemTotal} 
               newInvoice={newInvoice} setNewInvoice={setNewInvoice}    />
           ))}
            </div>
            <div className='addNewItem'style={{ color: storageMode ? '#fff': 'black'}} >
                   <button type='button' onClick={addItem} >
                    <img src='/assets/icon-plus.svg' alt='icon-plus'/>
                    <span>add New Item</span>
                   </button>
                 </div>
             </div>
    </WrappeFormInvoice>)
    })

const ItemName =React.memo(({onRemoveItem,item, onItemChange, onItemTotal, setNewInvoice , newInvoice })=>{ 
    const {storageMode} = useDarkMode(); 


    return(
        <>
        <div>
            <label htmlFor='itemName'>Item Name</label>
            <Input type='text' name='itemName' value={item.itemName} onChange={(e)=> onItemChange(e, item.id)} darkMode={storageMode}/>       
        </div>

        <div className=' qty-price' >   
        <div>
            <label htmlFor='itemQuantity'>Quantity</label>
            <Input type='number' name='itemQuantity' value={item.itemQuantity} className='input-quantity' onChange={(e)=> onItemChange(e, item.id)} darkMode={storageMode} />
           
        </div>
        <div>
            <label htmlFor='itemPrice'>Price</label>
            <Input type='number' name='itemPrice' value={item.itemPrice} onChange={(e)=> onItemChange(e, item.id)} className='input-price'darkMode={storageMode} />
           
        </div>
        <div>
            <label htmlFor='itemTotal'>Total</label>
            <Input type='number' name='itemTotal' value={newInvoice.total}  readOnly className='total-price'darkMode={storageMode}  />
        </div>
        
        <div>
            <button type='button' onClick={(e)=>onRemoveItem(e, item.id)}>
            <img src='/assets/icon-delete.svg' alt='delete'/>
            </button>
        </div>
        </div>


    </>
    )
})

const ItemNameEdit =({item, onChangeItem})=>{ 
    const {storageMode} = useDarkMode(); 

    return(
        <>
        <div>
            <label htmlFor='itemName'>Item Name</label>
            <Input type='text' name='itemName' value={item.itemName} onChange={(e)=>onChangeItem(e, item)} darkMode={storageMode} />       
        </div>

        <div className=' qty-price' >   
        <div>
            <label htmlFor='itemQuantity'>Quantity</label>
            <Input type='number' name='itemQuantity' value={item.itemQuantity} onChange={(e)=>onChangeItem(e, item)} className='input-quantity' darkMode={storageMode} />
           
        </div>
        <div>
            <label htmlFor='itemPrice'>Price</label>
            <Input type='number' name='itemPrice' value={item.itemPrice} onChange={(e)=>onChangeItem(e, item)} className='input-price' darkMode={storageMode}/>
           
        </div>
        <div>
            <label htmlFor='itemTotal'>Total</label>
            <Input type='number' name='itemTotal' value={item.itemTotal} onChange={(e)=>onChangeItem(e, item)} className='total-price' darkMode={storageMode}/>
        </div>
        
        <div>
            <button type='button'>
            <img src='/assets/icon-delete.svg' alt='delete'/>
            </button>
        </div>
        </div>


    </>
    )
}


const WrappeFormInvoice = styled.div`
background: ${props =>props.darkMode  ? '#141625': '#ffff' };
        padding: 5px 0px 15px 15px;
        width: 100%;
        h5{ 
        color: #7C5DFA; 
        font-size:13px;
        margin-bottom:5px;
        }
        h5.text-size{ 
            font-size: 20px;
            opacity: 0.5;
        }
        h1{
            font-size: 25px;
            margin-top: -10px;
            margin-bottom: 10px;
        }
        label{
            display: block;
             opacity: 0.5;
            font-size: 13px; 
        }

        .form-container{
             margin-top: 25px;
             .bill-company-client{
                  margin-bottom: 30px;
                .city-postal{ 
                  display: flex;

                  div:first-child{ 
                      margin-right: 30px;
                  }
                }
            }
        }
    .qty-price{ 
   display: flex; 
   justify-content: space-around;
      label{
          display: block;
      }
      img{
          margin-top: 35px;
      }
      button{ 
          border none; 
          outline: none; 
          background:none;
      }
    }
    .addNewItem{
       display: flex; 
       justify-content: center; 
       align-item: center;
       border-radius: 25px; 
       background : ${props =>props.darkMode ?'#252945': '#fff'};
       padding: 10px 15px;
       width:300px;
       button{
           outline: none; 
           border: none; 
           background:none;
           img{
               width:6px;
               margin-right: 8px;
           }
          span{ 
            color: ${props =>props.darkMode ?'#fff': '#7E88C3'};
              font-size: 10px;
          }
       }
    }
    @media only screen and (min-width: 768px){ 
        overflow:auto;
        height:1160px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      
    }
`