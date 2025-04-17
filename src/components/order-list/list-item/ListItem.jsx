import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import useIsOwner from "../../../hooks/useIsOwner";
import { Link } from "react-router";
import useIsLate from "../../../hooks/useIsLate";
import moment from "moment";

export default function ListItem({
    order,
    deleteOrder,
}){
    const {user} = useContext(AuthContext);
    const isOwner = useIsOwner(order.creator, user.username);
    const { isLate, warning } = useIsLate(order);
    const formattedDate = moment(order.expected, "DD/MM/YYYY г.").format("DD/MM/YYYY");

return (
        <tr className={`${order.isOptimistic ? "gray" : ""} ${warning ? "warning" : ""} ${isLate ? "late" : ""}`}>
            <td>{order.clientNumber}</td>
            <td>{order.clientName}</td>
            <td>{order.articleNumber}</td>
            <td>{order.quantity}</td>
            <td>{order.orderNumber}</td>
            <td>{formattedDate}</td>
            <td>{order.creator}</td>
            {isOwner 
                ?<td className="functions">
                    <button onClick={()=> deleteOrder(order.objectId)} disabled={order.isOptimistic ? true : false}>
                        <i className="fa-solid fa-check"></i>
                    </button>
                    <Link to={`/${order.objectId}/edit`} disabled={order.isOptimistic ? true : false}>
                        <i className="fa-solid fa-pencil"></i>
                    </Link>
                 </td>
                : <td></td>
            }
        </tr>
)
}