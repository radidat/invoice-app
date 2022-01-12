 import React, {useState, useLayoutEffect, useEffect} from 'react'; 
 
 export const useWindowSize = ()=>{
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])

    useLayoutEffect(()=>{
     
        const resizeWindow= ()=>{ 
            setSize([window.innerWidth, window.innerHeight])
        }
    
         window.addEventListener('resize', resizeWindow)
         return ()=>{
             window.removeEventListener('resize', resizeWindow)
         }
    },[])

    return size;
}


export const useLocalStorage = (key, initialValue)=>{ 

    const [storeValue, setStoreValue] = useState(()=>{ 
  
            try{
                const item = window.localStorage.getItem(key); 
               return  item ? JSON.parse(item) : initialValue; 
            } catch(error){
                console.log(error); 

                return initialValue;
            }       
    })

useEffect(() => {

}, [storeValue])

   const setValue = (value)=>{ 

        try{
            const valueToStore = value instanceof Function ? value(storeValue): value; 
            setStoreValue(valueToStore); 
            window.localStorage.setItem(key, JSON.stringify(storeValue));
        }catch(error){
            console.log(error);
        }
      
    }

    return [storeValue,setValue];
}
 /*export function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }*/