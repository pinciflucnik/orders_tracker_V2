import useAuth from "../../hooks/useAuth"

export default function Register(){
    const { register } = useAuth()
return (
    <div>
        <form action={register}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" autoComplete=""/>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" autoComplete=""/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" autoComplete=""/>
            <label htmlFor="rePass">Repeat password</label>
            <input type="password" id="rePass" name="rePass" autoComplete=""/>
            <button>Register</button>
        </form>
    </div>
)
}