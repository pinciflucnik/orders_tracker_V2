import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(() => {
        const persistedAuth = localStorage.getItem(`Parse/${import.meta.env.VITE_APP_ID}/currentUser`);
        if(!persistedAuth){
            setIsAuthenticated(false)
            return {}
        }

        const serverUser =  JSON.parse(persistedAuth)

        const user = {
            id: serverUser.objectId,
            email: serverUser.email,
            username: serverUser.username,
            accessToken: serverUser.sessionToken
        }

        setIsAuthenticated(true)
        return user
    });


    const userSetter = (data) => {
        if(data.username){
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
        setUser(data)
    }
return (
    <AuthContext.Provider value={{user, isAuthenticated, userSetter}}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContext