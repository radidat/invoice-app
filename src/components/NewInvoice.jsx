import React, {useState, useRef, useEffect, useCallback} from 'react'; 
import {FormNewInvoice} from './FormInvoice'; 
import { WrapperButtonForm, ButtonForm } from '../UI/Button';
import {useReducerDataInvoice} from '../context/InvoiceContext'; 
import { addInvoice } from '../firebaseConfig/dataBase';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import {useDarkMode} from '../context/DarkModeContext';
const NewInvoice =React.memo(()=>{ 
 const {dataInvoice } = useReducerDataInvoice();
 const {currentUser} = useAuth();
 const refTotal = useRef('');
 const [newInvoice, setNewInvoice]= useState({
     idItem:'item-1',
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

 const onNewInvoiceChange = (e)=>{
            e.preventDefault();
          let name = e.target.name; 
           let value = e.target.value; 
         setNewInvoice({...newInvoice, [name]: value})        
 }


 const onAddItem =useCallback((e)=>{ 
  e.preventDefault();
    const uuid = uuidv4(); 
          const newItemAdded ={id: uuid, itemName:'', itemQuantity:'', itemPrice:'', itemTotal:''};
              setNewInvoice({...newInvoice, items: [...newInvoice.items, newItemAdded]})
 }, [newInvoice.items])


console.log(newInvoice.items)

const onRemoveItem = (e, itemId)=>{
  e.preventDefault(); 
  const removeItem = newInvoice.items.filter((item, index)=> item.id!== itemId)
    setNewInvoice({...newInvoice, items: removeItem})
}

const onItemChange =(e, itemId)=>{
  let name = e.target.name;
  let value = e.target.value;
const itemAddValue  = newInvoice.items.map((itemm, index) =>{ 
   if(itemm.id ===itemId ){
   return {...itemm,  [name] :value }
   }  else{
    return itemm;
  }  
 
})


setNewInvoice({...newInvoice, items: itemAddValue});

}

const onSubmitInvoiceDraft = async(e)=>{
  e.preventDefault(); 
  e.stopPropagation();
   let status =''; 
  if(e.nativeEvent.submitter.name ==='save-draft'){
         status = 'draft'; 
    await addInvoice(newInvoice, status, currentUser.uid)
}
if(e.nativeEvent.submitter.name==='save-invoice'){
      status ='pending';
    await addInvoice(newInvoice, status, currentUser.uid)
}  

}
const {storageMode} = useDarkMode(); 

  if(newInvoice.items)
    return (<form onSubmit={onSubmitInvoiceDraft} autoComplete="off" >
           <FormNewInvoice title='New Invoice' onNewInvoiceChange={onNewInvoiceChange} 
           setNewInvoice={setNewInvoice} newInvoice={newInvoice} 
           onItemChange ={onItemChange}
           onAddItem ={onAddItem}
           refTotal={refTotal}
            onRemoveItem={onRemoveItem} />
           <WrapperButtonForm darkMode={storageMode} >
     <ButtonForm className='btn-discord'>Discord</ButtonForm>
     <ButtonForm className='btn-save-draft' name='save-draft' value='draft' >Save as Draft</ButtonForm>
     <ButtonForm className='btn-save-send' name='save-invoice' value='btn-invoice' >Save & Send</ButtonForm>
    </WrapperButtonForm>
    </form>)

})

export default NewInvoice; 