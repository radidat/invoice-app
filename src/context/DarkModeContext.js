import React, {useState, createContext, useContext, useEffect, useRef} from 'react'
import { useLocalStorage } from '../helper/helper';

function usePrevious(value) {
    
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
const darkModeContext = createContext(); 

const DarkModeContextProvider = ({children})=>{ 

    const storage = JSON.parse(localStorage.getItem('mode'))
    const [mode, setMode]= useLocalStorage('mode', storage);

     const storageMode = JSON.parse(window.localStorage.getItem('mode'))
    const stateMode ={
        storageMode,
        mode,   
        setMode
    }

     return  <darkModeContext.Provider value={stateMode}>
                       {children}
     </darkModeContext.Provider>
}
export const useDarkMode=()=>  useContext(darkModeContext)

export default DarkModeContextProvider;


