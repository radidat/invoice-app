import React, {useState} from 'react'; 

import { useAuth } from '../../context/AuthContext';
import {Input} from '../../UI/Input';
import {ButtonForm} from '../../UI/Button';
import { WrapperConnect } from './SignUp';
const ResetPassword =()=>{

    const [email, setEmail]= useState(''); 
    const {resetPassword} = useAuth(); 

    const onResetPassword=(e)=>{
          e.preventDefault(); 
            
          if(email){
              resetPassword(email)
          }
    }
    return<WrapperConnect>
    <form onSubmit={onResetPassword}className='form-connect' >
    <div> <h5 className='text-connect'>Reset Password</h5></div>
    <Input type='email' placeholder = 'email'  name='email'className='connexion' onChange={(e)=> setEmail(e.target.value)} value={email}/>
     <ButtonForm className='btn-connect' >Envoyer</ButtonForm>
     </form>
    </WrapperConnect>
}

export default ResetPassword;