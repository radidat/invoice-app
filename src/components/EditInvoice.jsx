import React, {useState, useEffect} from 'react'; 
import {FormEditInvoice}from './FormInvoice'; 
import { WrapperButtonForm, ButtonForm } from '../UI/Button';
import styled from  'styled-components';
import { createPortal } from 'react-dom';
import { getInvoice, updateInvoice } from '../firebaseConfig/dataBase';
import {useParams} from 'react-router-dom';
import {useTransition, animated, config} from 'react-spring';
import {useDarkMode} from '../context/DarkModeContext';
const EditInvoice = ()=>{ 
    const [invoice, setInvoice]= useState(); 
    const {id} = useParams();
    const [editInvoice, setEditInvoice]= useState({
       paymentDue:'', 
       description:'',
       paymentTerms:'',
       clientName:'',
       clientEmail:'',
       status:'', 
       senderAddressStreet:'', 
       senderAddressCity:'',
       senderAddressPostalCode:'',
       senderAddressCountry:'',
       clientAddressStreet:'',
       clientAddressCity :'',
       clienttAddressPostalCode:'',
       clientAddressCountry:'',
       items:[],
       total:''
    })
    const invoiceData = async(id)=>{ 
            
        const docSnap= await getInvoice(id); 
         if (docSnap.exists()) {
            setInvoice({id: docSnap.id, ...docSnap.data()});
           }
        }
     
        useEffect(()=>{
         
           invoiceData(id)
        },[id])

        useEffect(()=>{
         
           if( invoice !==undefined){ 
                 setEditInvoice({...editInvoice,
                    paymentDue: invoice.paymentDue, 
                    description: invoice.description,
                    paymentTerms:invoice.paymentTerms,
                    clientName:invoice.client.name,
                    clientEmail:invoice.client.email,
                    status:invoice.status, 
                    senderAddressStreet:invoice.sender.street, 
                    senderAddressCity:invoice.sender.city,
                    senderAddressPostalCode:invoice.sender.postal_code,
                    senderAddressCountry:invoice.sender.country,
                    clientAddressStreet:invoice.client.street,
                    clientAddressCity :invoice.client.city,
                    clienttAddressPostalCode:invoice.client.postal_code,
                    clientAddressCountry:invoice.client.country,
                    items:invoice.items,
                    total:invoice.total
                 })
           }
         },[invoice])

    const onChange =(e)=>{ 
        e.preventDefault(); 
        let name = e.target.name; 
        let value = e.target.value;
        setEditInvoice({...editInvoice, [name]: value})

    }

    const onChangeItem =(e,item)=>{
        const name = e.target.name; 
        const value = e.target.value; 
        const editItems = editInvoice.items.map(editItem=>{
             if(editItem.id === item.id){ 
                 return {...editItem, [name]: value}
             }else{ 
                 return editItem; 
             }
        })
        setEditInvoice({...editInvoice, items: editItems})
    }

    const onCancel = (e)=>{
        
        e.preventDefault();
        e.stopPropagation()
        
        if( invoice !==undefined){ 
            setEditInvoice({...editInvoice,
               paymentDue: invoice.paymentDue, 
               description: invoice.description,
               paymentTerms:invoice.paymentTerms,
               clientName:invoice.client.name,
               clientEmail:invoice.client.email,
               status:invoice.status, 
               senderAddressStreet:invoice.sender.street, 
               senderAddressCity:invoice.sender.city,
               senderAddressPostalCode:invoice.sender.postal_code,
               senderAddressCountry:invoice.sender.country,
               clientAddressStreet:invoice.client.street,
               clientAddressCity :invoice.client.city,
               clienttAddressPostalCode:invoice.client.postal_code,
               clientAddressCountry:invoice.client.country,
               items:invoice.items,
               total:invoice.total
            })
      }
    }
const {storageMode} = useDarkMode(); 

    const onEditInvoice= async (e)=>{
              e.preventDefault()
              const idInvoice = invoice.id
    const data =  await updateInvoice(idInvoice, editInvoice);
     console.log(data)
    }
    return (<form onSubmit={onEditInvoice}>
           <FormEditInvoice title='Edit #XM9141' onChange={onChange} onChangeItem ={onChangeItem} editInvoice ={editInvoice} goBack='invoiceDetail'/>
           <WrapperButtonForm className='btn-from-responsive' darkMode={storageMode} >
     <ButtonForm className='btn-cancel' type='button' onClick={onCancel}>Cancel</ButtonForm>
     <ButtonForm className='btn-save-change'>Save changes</ButtonForm>
    </WrapperButtonForm>
    </form>)

}

export default EditInvoice; 

export  const AnimatedEditInvoice = ({toggle, setToggle})=>{
      
    const transitions= useTransition(toggle, {
        trail: 500,
        from: {opacity: 0}, 
        enter: {opacity: 1}, 
        leave: {opacity: 0},
        config:{ duration: 450}
    });
    return createPortal(<>
    {transitions((style, item) =>(
    <WrapperAnimated style={{...style}} >
    <form>
        <button type='button' onClick={()=>setToggle(!toggle)}>fermer</button>
    <FormEditInvoice title='Edit #XM9141'/>
    <WrapperButtonForm>
<ButtonForm className='btn-cancel'>Cancel</ButtonForm>
<ButtonForm className='btn-save-change'>Save changes</ButtonForm>
</WrapperButtonForm>
</form>
</WrapperAnimated>  
    ))}

    </>
    , document.body)
}

const WrapperAnimated = styled(animated.div)` 
      width: 100%;
      position:absolute; 
      height: 179%;
      top: 72px; 
   form{ 
       position: absolute;
       border-top-right-radius: 25px;
       border-bottom-right-radius: 25px;
       z-index:10;
   }
   &::before {
    background-color: rgba(0,0,0,0.4) !important;
    content: "";

    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;   
  }
  @media only screen and (min-width:1024px){ 
      margin-top:-70px;
    form{ 
        margin-left: 110px;
    }
 }


`