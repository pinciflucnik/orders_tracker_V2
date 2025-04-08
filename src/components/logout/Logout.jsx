import { useEffect } from "react";
import useAuth from "../../hooks/useAuth"

export default function Logout(){
    const { myLogout } = useAuth();
    useEffect(() => {
        	myLogout()
    },[])
return (
    <div>
        <h1>Loggin out...</h1>
    </div>
)
}