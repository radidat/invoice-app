import React, {useReducer, createContext, useContext} from 'react';
import { reducerInvoice } from '../reducer/reducerInvoice';

 export const INITIAL_STATE ={
    dataInvoice:[], 
    invoice :{},
}


const invoiceContext = createContext(INITIAL_STATE)

const InvoiceContextProvider = ({children})=>{
    const[state, dispatch]= useReducer(reducerInvoice, INITIAL_STATE);


    const value={
        dataInvoice: state.dataInvoice, 
        invoice: state.invoice, 
        dispatch
    }

       return<invoiceContext.Provider value={value}>
                       {children}
       </invoiceContext.Provider>
}

 export const useReducerDataInvoice = ()=> (useContext(invoiceContext))

export default InvoiceContextProvider;