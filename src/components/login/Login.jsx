import { useContext } from "react"
import useAuth from "../../hooks/useAuth"
import AuthContext from "../../context/AuthContext"
import { Navigate } from "react-router";
import SmallLoader from "../loaders/SmallLoader";

export default function Login(){
    const { myLogin, pending } = useAuth()
    const { isAuthenticated } = useContext(AuthContext);
    const submitHandler = (e)=> {
        e.preventDefault()
        const data = new FormData(e.target)
        myLogin(data)
    }
return (
        <div className="input-form">
            {!isAuthenticated ?
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" autoComplete=""/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" autoComplete=""/>
                {pending ? <div className="loader-clock"><SmallLoader/></div> : <button>Login</button>}
            </form>
            : <Navigate to={"/orders"}/>
            }
        </div>
)
}