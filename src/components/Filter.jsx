import React,{useState, useEffect, useLayoutEffect} from 'react'; 
import styled from 'styled-components'; 
import { AnimatedEditInvoice } from './EditInvoice';
import { useWindowSize } from '../helper/helper';
import {Link, useHistory, useParams} from 'react-router-dom';
import {useDarkMode} from '../context/DarkModeContext';

const Filter = ()=>{ 
       const [width, height]= useWindowSize(); 
       const [btnChange, setbtnChange] = useState(false);
       const [showformNewInvoice, setShowformNewInvoice]= useState(false);
       const [showfilter, setShowfilter]= useState(false);
       const [checkedPending, setCheckedPending] = useState(false)
       const [checkedDraft, setCheckedDraft] = useState(false)
       const [checkedPaid, setCheckedPaid] = useState(false)
       const {storageMode} = useDarkMode();
       const history= useHistory();
    useEffect(()=>{
        
     if(width >= 768){ 
          setbtnChange(true);
     }else{ 
         setbtnChange(false);
     }
    },[width])

const {filterInvoice} =useParams();

    useEffect(()=>{ 

    if(checkedDraft) history.push('/filter/draft');
     checkedPending && history.push('/filter/pending');
     checkedPaid && history.push('/filter/paid');

    if(checkedDraft ===false && checkedPaid ===false
         && checkedPending ===false){ 
             history.push('/')
         }

    }, [checkedDraft, checkedPaid, checkedPending])

    const showForm = ()=>{
        setShowformNewInvoice((showformNewInvoice )=> !showformNewInvoice)
    }

    return(
        <WrapperFilter darkMode={storageMode}>
           <div className='count-invoice'>
              <h4>Invoices</h4>
              <p>7 invoices</p>
           </div>
           <div className='filter'>
               <button className='btn-filter' onClick={()=>setShowfilter(!showfilter)} type='button'>Filter <span> <img src='/assets/icon-arrow-down.svg' alt='arrow-down'/></span></button>
              {showfilter && <FilterByElement checkedDraft={checkedDraft} 
              checkedPending={checkedPending}
              checkedPaid={checkedPaid}
              setCheckedDraft={setCheckedDraft}
              setCheckedPending={setCheckedPending}
              setCheckedPaid={setCheckedPaid}
              />} 
               <div className='new-invoice'>
                   {
                    btnChange? 
                       <div className='add-btn'>
                       <button type='button' onClick={showForm}>
                           <img src='/assets/icon-plus.svg' alt='plus'/>
                       </button>
                       </div>
                       :
                       <div className='add-btn'>
                     <Link to='/newInvoice'>
                         <img src='/assets/icon-plus.svg' alt='plus'/>
                     </Link>
                     </div>
                   }
                   {showformNewInvoice && <AnimatedEditInvoice toggle ={showformNewInvoice} setToggle={setShowformNewInvoice}/>}
               <p>new</p>  
                </div>
           </div>
        </WrapperFilter>
    )

}

const FilterByElement =({checkedPaid, 
    checkedPending, checkedDraft, 
    setCheckedPending , setCheckedDraft, setCheckedPaid})=>{ 
       const {storageMode} = useDarkMode();

       console.log(storageMode)
const onChangePending =()=>{
    setCheckedPending(!checkedPending)
}
const onChangePaid =(e)=>{
    e.stopPropagation()
    setCheckedPaid(!checkedPaid)
}
const onChangeDraft =()=>{
    setCheckedDraft(!checkedDraft)
    
}
    return(
    <WrapperFilterByElement darkMode={storageMode}>
             <div className='filter-element-container'>
                 <input type='checkbox' onChange={onChangeDraft} checked={checkedDraft} name='draft' id='draft'/>
                 <label htmlFor='draft'>draft</label>
             </div>
             <div className='filter-element-container' >
                 <input type='checkbox' onChange={onChangePending} checked={checkedPending} name='pending' id='pending'/>
                 <label htmlFor='pending'>pending</label>
             </div>
             <div className='filter-element-container' >
                 <input type='checkbox' onChange={onChangePaid} checked={checkedPaid} name='paid' id='paid'/>
                 <label htmlFor='paid'>paid</label>
             </div>
        </WrapperFilterByElement>
        )
}

const WrapperFilterByElement= styled.div`
   position:absolute; 
   z-index: 5; 
   ${props =>props.darkMode  ? '#252945': '#fff' }
   border-radius: 5px;
   top: 135px; 
   transform: translateX(-100px);
   box-shadow: 1px 1px 12px rgba(0,0,0,0.2);
   
   .filter-element-container{
    margin:10px 20px; 

}
   input{
    cursor:pointer;
     height: 15px; 
     width: 15px;
  }
   label{ 
       text-transform: capitalize; 
       font-weight: 500; 
       margin-left:15px;
   }
   @media only screen and (min-width: 1024px){ 
    top: 120px; 
    width:192px; 
    height: 128px;
     transform: translateX(-150px);
   }
`; 


const WrapperFilter = styled.div`
   display: flex; 
   justify-content: space-between; 
   flex-direction: row;
   margin: 35px 10px; 
   
   .count-invoice p{
       font-size:12px;
         opacity:0.3; 

   }


   .filter{ 
       display: flex;

     .btn-filter{ 
         cursor:pointer;
         margin-top:-10px;
        outline:none; 
        border: none; 
        color: ${props =>props.darkMode  ? 'white': 'black' };
        background:none;
        span{
            margin-left: 5px;
        }
    }
       .new-invoice{

            margin-left: 10px;
           display:flex;
           border-radius:25px; 
            width: 99px; 
            height: 44px;
           background-color: #7C5DFA;
          p{
              color:#fff;
            margin-left:15px;
            margin-top: 10px;
            font-weight:500;
            text-transform: capitalize;
          }
          .add-btn{
              border-radius:50%; 
               background-color:#fff;
               margin-left:5px;
               margin-top:7px;
               width: 32px; 
               height:32px;
              button, a{ 
                  cursor:pointer;
                  outline:none; 
                  background:none; 
                  border:none;
                 img {
                      margin:10.5px;
                  }
              }

          }

       }
   }

   @media only screen and (min-width: 768px){ 
         h4{
             font-size: 32px;
         }
         .count-invoice p{
            font-size:16px;
     
        }
        
   .filter{ 
  .btn-filter{ 
      font-size: 17px;
 }
   }


   @media only screen and (min-width: 1024px){ 
    margin: 80px 20% 20px 20%;
}
`; 

export default Filter; 