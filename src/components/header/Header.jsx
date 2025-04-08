import { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../../context/AuthContext";

export default function Headers(){
    const {user, isAuthenticated } = useContext(AuthContext);
return (
    <div className="navigation">
        <ul>
            <li><Link to="/orders">Active orders</Link></li>
            {!isAuthenticated && <li><Link to="/">Login</Link></li>}
            {isAuthenticated && 
                (
                    <>
                        <li><Link to="/create">Add order</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </>
                )
            
            }
        </ul>
        {isAuthenticated && <h3>Hello, {user.username}</h3>}
    </div>
)
}