import React, {useState} from 'react'; 
import {Input} from '../../UI/Input';
import {ButtonForm} from '../../UI/Button';
import styled from 'styled-components'; 
import { useAuth } from '../../context/AuthContext';
import {newUser} from '../../firebaseConfig/dataBase'; 
import { storage} from '../../firebaseConfig/firebaseConfig'; 
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { useHistory } from 'react-router';
const SignUp =()=>{ 
  const [displayName, setDisplayName]= useState('');
  const [lastName, setLastName]= useState('');
  const [email, setEmail]= useState('');
  const [confirmEmail, setConfirmEmail]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [photoURL, setPhotoURL]= useState('');
  const [error, setError] = useState([])
  const {createACompte} = useAuth(); 
   const history = useHistory();
  const onDownload =(e)=>{
    const file = e.target.files[0]; 

const storageRef = ref(storage, `images/${file.name}`); 
uploadBytes(storageRef, file).then(snapshot =>{ 
    getDownloadURL(snapshot.ref).then((downloadUrl)=>{
         setPhotoURL(downloadUrl);
    })
    
})

  }

  
 const sendDataSignIn= async(e)=>{ 
     e.preventDefault(); 
     const othersData = {
         displayName, 
         lastName,
         photoURL
     }; 

     try{
      if(email === confirmEmail && password ===confirmPassword){
        const user  = await createACompte(email, password, othersData);
             if(user!= undefined){
                await newUser(user, othersData);
                history.push('/');
             }
           
      }else{
          setError(['email ou le mot de passe ne sont pas identiques, réessez à nouveau !']); 
      }

     }catch(error){ 
            const err = error.message;
             setError([err])
     }
 }
     
console.log(error)
 return(<WrapperConnect>
     <form onSubmit={sendDataSignIn} className='form-connect'>
             <div> <h5 className='text-connect'>S'inscrire</h5></div>
          <Input type ='text' placeholder = 'first name' name='displayName' className='connexion' onChange={(e)=>setDisplayName(e.target.value)} value={displayName}/>
          <Input type ='text' placeholder = 'last name' name='lastName' className=' connexion' onChange={(e)=> setLastName(e.target.value)} value={lastName} />
          <Input type ='email' placeholder = 'your email' name='email' className='connexion'onChange={(e)=> setEmail(e.target.value)}  value={email} />
          <Input type='email' placeholder = 'confirm your email'  name='confirmEmail'className='connexion' onChange={(e)=> setConfirmEmail(e.target.value)}/>
          <Input type='password' placeholder = 'password' name='password' className=' connexion' onChange={(e)=> setPassword(e.target.value)} value={password} />
          <Input type ='password' placeholder = 'confirm password'  name='confirmPassword'className='connexion'onChange={(e)=> setConfirmPassword(e.target.value)} />
          <div className='addPhotoContainer'>
        <label htmlFor='photoUrl'>  Ajouter une photo </label>
          <Input type ='file'  name='photoUrl[]' placeholder='ajouter une photo' className='addFile' onChange={(e)=>onDownload(e)}  accept=".png, .jpg, .jpeg"  />
          </div>
         
      <ButtonForm onClick={sendDataSignIn} className='btn-connect' >Enregistrer</ButtonForm>
      </form>
     </WrapperConnect>)
}


export default SignUp; 



 export const WrapperConnect = styled.div` 
    
     display: flex; 
     justify-content: center; 
     align-item: center;
     margin: 150px 15px;
     border-radius: 5px;

     background-color:#fff;
     .form-connect{ 
       width: 100%;
       margin-top:5%;
       margin-left: 15%;

     }
     a{
         text-decoration: none;
     }

    .addPhotoContainer{
        position: relative; 
    }
    label{ 
        background-color: #373B53;
        border-radius: 25px;
        padding: 5px;
        color:#fff; 
    }
 
    .text-connect{ 
        color: #373B53;
     text-align: center;
     font-size: 25px;
     margin-bottom: 15px;
     margin-left: -50px;
    }

    @media only screen and (min-width: 768px){
        .form-connect{ 
            margin-left: 10%;
     
          }
    }
    @media only screen and (min-width: 768px){
        width: 50%;
        margin-left: auto; 
        margin-right: auto;
        .form-connect{ 
            margin-top:5%;
            margin-left: 10%;
     
          }
    }
`