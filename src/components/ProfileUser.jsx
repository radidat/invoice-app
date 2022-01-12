import React, {useState} from 'react'; 
import styled from 'styled-components'; 
import {Input} from '../UI/Input'
import {ButtonForm} from '../UI/Button';
import { useAuth } from '../context/AuthContext';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { storage} from '../firebaseConfig/firebaseConfig'; 
import {useDarkMode} from '../context/DarkModeContext';
const ProfileUser =()=>{ 
    
    const [showEditProfile, setShowEditProfile]= useState(false);
    const {userData, updataProfileAndPassword}= useAuth(); 
    const {displayName, lastName, email, photoURL} =userData;
    const {storageMode} = useDarkMode(); 
    const onShowEdit = (e)=>{
       e.preventDefault();
        setShowEditProfile(!showEditProfile)
    }
    return(<WrapperProfileUser darkMode={storageMode} >
          <div className='form-profile'>
          <div className='avatar-update'>
    <img src={photoURL} width='100px' height='100px'/>
    <div className='addPhotoUpdate'>
        <label htmlFor='photoUrl'><img src='/assets/edit.png' width='25px' height='25px'/></label>
          <Input type ='file'  name='photoUrl[]' placeholder='ajouter une photo' className='updatePhoto' disabled accept=".png, .jpg, .jpeg" darkMode={storageMode} />
          </div>
</div>
   <div className='form-input-container'>
   <div>
        <label htmlFor='displayName'>Nom : </label>
        <Input type='text' name='displayName' className='input-profile' readOnly value={displayName} darkMode={storageMode} />
    </div>
    <div>
        <label htmlFor='lastName'>Prenom : </label>
        <Input type='text' name='lastName' className='input-profile' readOnly value={lastName} darkMode={storageMode} />
    </div>
    <div>
        <label htmlFor='email'>Email : </label>
        <Input type='email' name='email' className='input-profile' readOnly value={email} darkMode={storageMode} />
    </div>
    <div>
        <label>password : </label>
        <Input type='password'placeholder='*********' readOnly className='input-profile' value='' darkMode={storageMode} />
    </div>
   </div>
    <ButtonForm type='button' onClick={onShowEdit}>Modifier</ButtonForm>
    {showEditProfile  && <EditProfile userData={userData}/>}
</div>
         
    </WrapperProfileUser>)

}

const EditProfile =({userData})=>{ 
    
    const {displayName, lastName, email, photoURL} =userData;
    const {updateProfileAndPassword, currentUser}= useAuth(); 
    const [emailUpdate, setEmailUpdate]= useState(email);
    const [lastNameUpdate, setLastNameUpdate]= useState(lastName);
    const [displayNameUpdate, setDisplayNameUpdate]= useState(displayName);
    const [passwordUpdate, setPasswordUpdate]= useState('new-password');
    const [photo, setPhoto]= useState('');
    const {storageMode} = useDarkMode(); 

    const onDownload =(e)=>{
        const file = e.target.files[0]; 
          if(file.name){
            const storageRef = ref(storage, `images/${file.name}`); 
            uploadBytes(storageRef, file).then(snapshot =>{ 
                getDownloadURL(snapshot.ref).then((downloadUrl)=>{
                     setPhoto(downloadUrl);
                })          
            })
          }
      }

     const onUpdateProfile= (e)=>{ 
            e.preventDefault()
        const dataProfileUpdate={}

       if(emailUpdate !== email && emailUpdate !=='') dataProfileUpdate['email'] = emailUpdate;
       if(displayNameUpdate!== displayName && displayNameUpdate !=='' ) dataProfileUpdate['displayName'] = displayNameUpdate;
       if(lastNameUpdate!== lastName && lastNameUpdate !=='') dataProfileUpdate['lastName'] = lastNameUpdate;
       if(photo !=='') dataProfileUpdate['photoURL'] = photo;
           
       if(Object.keys(dataProfileUpdate).length > 0 || (passwordUpdate !=='' && passwordUpdate !=='new-password')){
           console.log(dataProfileUpdate)
         updateProfileAndPassword(dataProfileUpdate,passwordUpdate);
         console.log(currentUser)
       }
      
     }
return(<WrapperProfileUser className='editprofile'darkMode={storageMode} >

<form className='form-profile  form-edit-profile' onSubmit={onUpdateProfile}>
    <div className='avatar-update'>
    <img src={photoURL} width='100px' height='100px'/>
    <div className='addPhotoUpdate'>
        <label htmlFor='photoUrl'><img src='/assets/edit.png' width='25px' height='25px'/></label>
          <Input type ='file'  name='photoUrl[]' placeholder='ajouter une photo' className='updatePhoto' onChange={(e)=>onDownload(e)}  accept=".png, .jpg, .jpeg" darkMode={storageMode}  />
          </div>
</div>
   <div className='form-input-container'>
   <div>
        <label htmlFor='displayName'>Nom : </label>
        <Input type='text' name='displayName' className='input-profile' onChange={(e)=>setDisplayNameUpdate(e.target.value)}value={displayNameUpdate} darkMode={storageMode} />
    </div>
    <div>
        <label htmlFor='lastName'>Prenom : </label>
        <Input type='text' name='lastName' className='input-profile' onChange={(e)=>setLastNameUpdate(e.target.value)} value={lastNameUpdate}darkMode={storageMode} />
    </div>
    <div>
        <label htmlFor='email'>Email : </label>
        <Input type='email' name='email' className='input-profile' onChange={(e)=>setEmailUpdate(e.target.value)} value={emailUpdate} autoComplete="off" darkMode={storageMode} />
    </div>
    <div>
        <label>password : </label>
        <Input type='password' className='input-profile' onChange={(e)=>setPasswordUpdate(e.target.value)} value={passwordUpdate} autoComplete='off'darkMode={storageMode} />
    </div>
   </div>
    <ButtonForm>Save</ButtonForm>
</form>
</WrapperProfileUser>)

}



const WrapperProfileUser = styled.div`
background: ${props =>props.darkMode  ? '#252945': '#fff' };

   margin: 80px auto;
     width: 90%;
       .form-profile{
           width:100%; 
           margin-left: 25px;
           padding-top: 25px;
       }
       .avatar-update img{
        display: block;
        margin-left: auto;
        margin-right: auto;
        transform: translateX(-30%)
       }
       .form-input-container{ 
           margin-top: 50px;
       }
    &.editprofile{ 
        margin:0; 
        padding: 0;
        content:"";
        position:absolute;
        background-color: rgba(0, 0, 0, 0.5);
        top:0;
        left: 0; 
        right: 0
        bottom: 0;
        width: 100%; 
        margin-top: 70px;
        height: 100%;
        z-index:1;
    }
    .form-edit-profile{
         background-color:#fff; 
         margin-top: 50px;
         margin-left: 15px;
         padding-left: 30px;
        width: 90%;
        z-index: 2;
    }
    .addPhotoUpdate{
        position: relative; 
        
    }
    .addPhotoUpdate label{
        position: absolute;
        border-radius: 25px;
        padding: 5px;
        color:#fff; 
    }
.addPhotoUpdate label, .updatePhoto{ 
    transform: translate(-50%, -50%);
    margin: 25px 50%;
}
    .updatePhoto{
        position: absolute;
        width: 25px;
        opacity: 0;
    }

`; 

export default ProfileUser; 

