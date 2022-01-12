import React, {createContext, useState, useEffect, useContext} from 'react'; 
import {createUserWithEmailAndPassword, onAuthStateChanged,
     updateProfile,
 signInWithEmailAndPassword, signOut, 
 updateEmail, reauthenticateWithCredential, 
 updatePassword, 
sendPasswordResetEmail} from 'firebase/auth'; 
 import { doc, updateDoc, setDoc } from "firebase/firestore";
 import {db} from '../firebaseConfig/firebaseConfig';
import {auth} from '../firebaseConfig/firebaseConfig'; 
import { useLocalStorage } from '../helper/helper';
import { newUser } from '../firebaseConfig/dataBase';
const authContext = createContext(); 



 export const AuthContext =({children})=>{
    const [currentUser, setCurrentUser] = useLocalStorage('user', null);
    const [userData, setUserData]= useLocalStorage('userData',{});

    const createACompte=(email, password, othersData)=>{

        return new Promise((resolve, reject)=>{ 
         createUserWithEmailAndPassword(auth, email, password).then(userCredential =>{ 

           const currentUser = userCredential.user; 
           const  {displayName, photoURL} = othersData; 
            updateProfile(currentUser, {
               displayName: displayName, 
                photoURL: photoURL
            }).then(()=>{
                 resolve(currentUser);
            })
         }).catch(error =>{
               reject(error.message);
         })

        })
    
    }

   const  updateProfileAndPassword = (dataProfile, password=null)=>{ 
        
                 const updateDataProfile= {}; 
                 if(dataProfile.hasOwnProperty('displayName')) updateDataProfile['displayName'] = dataProfile.displayName;
                 if(dataProfile.hasOwnProperty('photoURL')) updateDataProfile['photoURL'] = dataProfile.photoURL;

            if(Object.keys(updateDataProfile).length > 0){ 
                updateProfile(auth.currentUser,updateDataProfile)
                .then(()=>{
                    console.log(' update with success')   
                    const docUser = doc(db,`users/${currentUser.uid}`);
                    updateDoc(docUser, dataProfile).then(()=>{
                        console.log('doc updated')
                    }).catch(error =>{
                        console.log(error.message)
                    })
                })             
            }

            if(password !== null && password !=='' && password !=='new-password'){
                updatePassword(auth.currentUser, password).then(()=>{
                    console.log('password updated')
                }).catch(error =>{ 
                    console.log(error.message)
                })
            }

           
            if(dataProfile.hasOwnProperty('email')){
                updateEmail(auth.currentUser, dataProfile.email).then(()=>{
                            console.log('email update')  
                    const docUser = doc(db,`users/${currentUser.uid}`);
                    updateDoc(docUser, {email : dataProfile.email}).then(()=>{
                        console.log('doc updated')
                    })
                })
            }

   }

   const resetPassword =(email)=>{
    const optionResetPassword ={
        url:'http://localhost:3000/signin'
    } 
    sendPasswordResetEmail(auth, email, optionResetPassword ).then(()=>{ 
           console.log("email has been sent ")
    }).catch(error => console.log(error) )     
   }


    const  signIn =(email, password)=>{

        return new Promise((resolve, reject) =>{
            signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{ 
                      resolve(userCredential); 
                      reauthenticateWithCredential(auth.currentUser, userCredential).then(() => {
                       // User re-authenticated.
                      }).catch((error) => {
                      });
            }).catch(error =>{ 
               const err =`error when you try to connect in app  ${ error.message}`; 
                reject(err);
            })
        })
        
    }
 const onSignOut =()=>{
     
    signOut(auth).then(()=>{ 
        setCurrentUser(null);
        setUserData({});
    })
 }

    const value={
        createACompte,
        currentUser,
        signIn,
        setCurrentUser,
        onSignOut, 
        userData,
        updateProfileAndPassword, 
        resetPassword
    }
   

    useEffect(async()=>{
        onAuthStateChanged(auth,(userCredential)=>{   
            setCurrentUser(userCredential);           
        })
        if(currentUser){ 
            const data = await newUser(currentUser); 
            setUserData(data)
        }

    },[currentUser])

    return(<authContext.Provider value ={value}>
                     {children}
    </authContext.Provider>)
}  

 export const useAuth = ()=> useContext(authContext); 
    