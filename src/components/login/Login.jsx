import useAuth from "../../hooks/useAuth"

export default function Login(){
    const { myLogin } = useAuth()
return (
    <div>
        <form action={myLogin}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" autoComplete=""/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" autoComplete=""/>
            <button>Login</button>
        </form>
    </div>
)
}