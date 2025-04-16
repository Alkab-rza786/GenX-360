import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [Dtoken, setDToken] = useState(false)
   
   

    
    // const backendUrl = import.meta.env.VITE_BACKEND_URL

    
    useEffect(() => {
        setDToken(localStorage.getItem('Dtoken') ? localStorage.getItem('Dtoken') : false)
    }, [])




  
   
    const value = {
        Dtoken, setDToken, 
    }



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider