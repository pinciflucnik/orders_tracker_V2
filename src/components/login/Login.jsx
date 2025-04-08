import { useContext } from "react"
import useAuth from "../../hooks/useAuth"
import AuthContext from "../../context/AuthContext"
import { Navigate } from "react-router";

export default function Login(){
    const { myLogin } = useAuth()
    const { isAuthenticated } = useContext(AuthContext);
return (
        <div>
            {!isAuthenticated ?
            <form action={myLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" autoComplete=""/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" autoComplete=""/>
                <button>Login</button>
            </form>
            : <Navigate to={"/orders"}/>
            }
        </div>
)
}