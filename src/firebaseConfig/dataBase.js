import {db} from  './firebaseConfig'; 
import {getDoc, doc, setDoc, where,
    getDocs, addDoc, query,collection, updateDoc, serverTimestamp} from 'firebase/firestore'

 export const newUser = (user, othersData ={}) =>{
       const uid = user.uid; 
    const docRef = doc(db,`users/${uid}`);

    return new Promise((resolve, reject)=>{ 
      getDoc(docRef).then((docSnap)=>{ 

         if(!docSnap.exists()){
            const {displayName, email, photoURL} = user;
            const {lastName} = othersData; 
             setDoc(docRef, {
                displayName: displayName, 
                email: email, 
                lastName: lastName, 
                photoURL: photoURL
             })
         }
      const data = {id: docSnap.id,...docSnap.data()}; 
      resolve(data); 

      }).catch(error =>{ 
         reject(error.message);
      })
         }) 
}



 export const addInvoice = async (dataInvoice, status, user_id)=>{

   const { paymentDue, description,paymentTerms,clientName,
      clientEmail,senderAddressStreet,senderAddressCity,
      senderAddressPostalCode,senderAddressCountry,clientAddressStreet,
      clientAddressCity,clienttAddressPostalCode,clientAddressCountry, items} = dataInvoice;
    const docRef = await addDoc(collection(db, "invoices"), {
      paymentDue : paymentDue, 
      description : description, 
       paymentTerms: paymentTerms,
       status: status,
       sender: { 
          street : senderAddressStreet, 
          city : senderAddressCity,
          postal_code: senderAddressPostalCode, 
          country: senderAddressCountry
       }, 
       client:{
          name: clientName, 
          email : clientEmail,
          street: clientAddressStreet, 
          city : clientAddressCity, 
         postal_code : clienttAddressPostalCode,
         country : clientAddressCountry 
       }, 
       items:items,
       user_id: user_id
       })

       console.log('Document written Id : ', docRef.id)
       
}



export const getInvoiceByStatus= async(filterByStatus =undefined, currentUser)=>{ 

   let q; 

     try{ 
      if (filterByStatus !==undefined && currentUser!==undefined){ 
         console.log(currentUser)
         q = query(collection(db, "invoices"), where("status", "==", filterByStatus ),where("user_id","==", currentUser ));
      }else{ 
         q  = query(collection(db, "invoices"),where("user_id","==", currentUser))
      }
      const dataInvoice =   await getDocs(q);

      return dataInvoice;
   
     }catch(err){ 
        console.log(err)
     }
    

}
export const getInvoice= async(idInvoice = null)=>{ 

      if (idInvoice){ 
      let q = doc(db, "invoices", idInvoice)
      try{
         const invoice =   await getDoc(q);
         return invoice;
      }catch(err){ 
         console.log(err)
      } 
      }
}

export const updateInvoice =  async(idInvoice=undefined, updateInvoice={})=>{  
   
   try{
            if(idInvoice !==undefined){
               const docRef = doc(db, "invoices", idInvoice); 
                const docUpdate ={}
               const update = await updateDoc(docRef,
                updateInvoice); 
               return update;
            }

   }catch(err){
    console.log(err)
   }
}