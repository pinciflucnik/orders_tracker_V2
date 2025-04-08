import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import useIsOwner from "../../../hooks/useIsOwner";
import useGetOrders from "../../../hooks/useGetOrders";

export default function ListItem({
    order,
    deleteOrder,
    editOrder
}){
    const {user} = useContext(AuthContext);
    const isOwner = useIsOwner(order.creator, user.username);

return (
        <tr className={order.isOptimistic ? "gray" : ""}>
            <td>{order.clientNumber}</td>
            <td>{order.clientName}</td>
            <td>{order.articleNumber}</td>
            <td>{order.quantity}</td>
            <td>{order.orderNumber}</td>
            <td>{order.expected}</td>
            <td>{order.creator}</td>
            {isOwner && 
                <td>
                    <button onClick={()=> deleteOrder(order.objectId)} disabled={order.isOptimistic ? true : false}>
                        <i className="fa-solid fa-check"></i>
                    </button>
                    <button disabled={order.isOptimistic ? true : false}>
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                </td>
            }
        </tr>
)
}