import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import useIsOwner from "../../../hooks/useIsOwner";

export default function ListItem({
    order
}){
    const {user} = useContext(AuthContext);
    const isOwner = useIsOwner(order.creator, user.username);
return (
        <tr>
            <td>{order.clientNumber}</td>
            <td>{order.clientName}</td>
            <td>{order.articleNumber}</td>
            <td>{order.quantity}</td>
            <td>{order.orderNumber}</td>
            <td>{order.expected}</td>
            <td>{order.creator}</td>
            {isOwner && 
                <td>
                    <button>
                        <i className="fa-solid fa-check"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                </td>
            }
        </tr>
)
}