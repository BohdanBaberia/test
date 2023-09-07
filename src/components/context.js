import { createContext, useContext,useState } from "react"

    const AppContext = createContext();

    export const useAppContext = () => useContext(AppContext);

    export const AppContextProvider = ({ children }) => {
        const [query,setQuery] = useState({}) 

        const onSearch = (value) =>{
            setQuery({name: `/.*${value}.*/`}) 
        }

        return (
            <AppContext.Provider value={{ query,onSearch }}>
            {children}
            </AppContext.Provider>
        )
    }