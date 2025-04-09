import { useParams } from "react-router";
import useCreate from "../../hooks/useCreate"
import useGetOne from "../../hooks/useGetOne";

export default function HandleOrder(){
    const { orderId } = useParams();
    const { handleOrder } = useCreate();
    const order = useGetOne(orderId);
return (
    <div>
        <form action={(data) => handleOrder(orderId, data)}>
            <label htmlFor="clientNumber">Client &#8470;</label>
            <input type="text" name="clientNumber" id="clientNumber" defaultValue={order.clientNumber}  required/>
            
            <label htmlFor="clientName">Client name</label>
            <input type="text" name="clientName" id="clientName" defaultValue={order.clientName} required/>

            <label htmlFor="articleNumber">Item</label>
            <input type="text"  name="articleNumber" id="articleNumber" defaultValue={order.articleNumber} required/>

            <label htmlFor="quantity">Quantity</label>
            <input type="number"  name="quantity" id="quantity" defaultValue={order.quantity} required/>

            <label htmlFor="orderNumber">Order &#8470;</label>
            <input type="text"  name="orderNumber" id="orderNumber" defaultValue={order.orderNumber} required/>

            <label htmlFor="expected">Expected on</label>
            <input type="date"  name="expected" id="expected" defaultValue={order.expected} required/>


            <button>{orderId ? "Edit" : "Create"}</button>
        </form>
    </div>
)
}