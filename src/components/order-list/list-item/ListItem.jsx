import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import useIsOwner from "../../../hooks/useIsOwner";
import { Link } from "react-router";
import useIsLate from "../../../hooks/useIsLate";
import moment from "moment";
import SmallLoader from "../../loaders/SmallLoader";

export default function ListItem({
    order,
    deleteOrder,
}){
    const {user} = useContext(AuthContext);
    const isOwner = useIsOwner(order.creator, user.username);
    const { isLate, warning } = useIsLate(order);
    const formattedDate = moment(order.expected, ["DD.MM.YYYY", "MM.DD.YYYY", "DD.MM.YYYY г.", "D.MM.YYYY г.", "MM/DD/YYYY", "DD/MM/YYYY", "DD/MM/YYYY г.", "M/DD/YYYY", "M/D/YYYY"], true).format("DD.MM.YYYY");
    
return (
        <tr className={`${warning ? "warning" : ""} ${isLate ? "late" : ""} ${order.isOptimistic ? "gray" : ""}`}>
            <td>{order.clientNumber}</td>
            <td className="clientName">{order.clientName}</td>
            <td>{order.articleNumber}</td>
            <td>{order.quantity}</td>
            <td>{order.orderNumber}</td>
            <td>{formattedDate}</td>
            <td className="creator">{order.creator}</td>
            {isOwner 
                ?<td className="functions">
                    {order.isOptimistic 
                        ? <SmallLoader isOptimistic={order.isOptimistic} />
                        : 
                        <>
                            <button onClick={()=> deleteOrder(order.objectId)}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <Link to={`/${order.objectId}/edit`} >
                                <i className="fa-solid fa-pencil"></i>
                            </Link>
                        </>
                    }   
                 </td>
                : <td></td>
            }
        </tr>
)
}