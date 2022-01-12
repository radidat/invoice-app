import React, {useState, useEffect} from 'react'; 
import {WrapperConnect} from './SignUp'; 
import {Input} from '../../UI/Input'; 
import {ButtonForm} from '../../UI/Button'; 
import { useAuth } from '../../context/AuthContext';
import { useHistory, Link} from 'react-router-dom';
import { newUser } from '../../firebaseConfig/dataBase';

const SignIn =()=>{ 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {signIn, setUserData} = useAuth(); 
    const history = useHistory(); 

    const onSignIn= async(e)=>{ 
     e.preventDefault(); 
        try {
            const user = await signIn(email, password);
           const dataUser = await newUser(user.user);
                    history.push('/');
        }catch(error){
              const err = error.message; 
              console.log(error)
              setError([err]); 
        }
        
    }

    return(<WrapperConnect>
        <form onSubmit={onSignIn}className='form-connect' >
        <div> <h5 className='text-connect'>Se connecter</h5></div>
        <Input type='email' placeholder = 'email'  name='email'className='connexion' onChange={(e)=> setEmail(e.target.value)} value={email}/>
        <Input type='password' placeholder = 'password' name='password' className='connexion' onChange={(e)=> setPassword(e.target.value)} value={password} />
        <div> <Link to='/changePassword'> mot de passe oublié ? </Link></div>
        <div> <Link to='/signup'> s'inscrire </Link></div>
         <ButtonForm className='btn-connect' >se connecter</ButtonForm>
         </form>
        </WrapperConnect>)
}

export default SignIn; 