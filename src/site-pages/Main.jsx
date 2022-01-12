import React, {useEffect, useState} from 'react'
import Filter from '../components/Filter'
import Invoice from '../components/Invoice'
import InvoiceDetail from '../components/InvoiceDetail'; 
import NothingInvoice from '../components/NothingInvoice'; 
import {getInvoiceByStatus} from '../firebaseConfig/dataBase';
import {useAuth} from '../context/AuthContext'; 
import {useParams} from 'react-router-dom'; 

function Main() {

const [dataInvoice, setDataInvoice] = useState([]); 
const {currentUser} = useAuth(); 
const {filterInvoice} =useParams();

    useEffect(()=>{
         getData(filterInvoice);
    },[filterInvoice])




const getData = async (filterInvoiceStatus)=>{  
    const data =[]
    if(currentUser !==undefined){ 
        
        const querySnapshot = await getInvoiceByStatus(filterInvoiceStatus, currentUser.uid); 
          if(querySnapshot){
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()})});
          }
        
    }   
if(data.length > 0){
    setDataInvoice(data)
}
}

    return ( <div>
             <Filter/>
            {dataInvoice.length > 0 ? 
            
            dataInvoice.map(invoice =>{ 
            return  <Invoice key={invoice.id} invoice={invoice}/>
            }) 
            :
            <NothingInvoice/>
            }
           
             </div>
    )
}

export default Main
