import { useParams } from "react-router";
import useCreate from "../../hooks/useCreate"
import useGetOne from "../../hooks/useGetOne";
import SmallLoader from "../loaders/SmallLoader";

export default function HandleOrder(){
    const { orderId } = useParams();
    const { handleOrder, handlePending } = useCreate();
    const { order, pending } = useGetOne(orderId);
return (
    <div className="input-form">
        <form action={(data) => handleOrder(orderId, data)}>
            <label htmlFor="clientNumber">Client &#8470;</label>
            <input type="text" name="clientNumber" id="clientNumber" className={pending ? "loading" : ""} defaultValue={order.clientNumber}  required/>
            
            <label htmlFor="clientName">Client name</label>
            <input type="text" name="clientName" id="clientName" className={pending ? "loading" : ""} defaultValue={order.clientName} required/>

            <label htmlFor="articleNumber">Item</label>
            <input type="text"  name="articleNumber" id="articleNumber" className={pending ? "loading" : ""} defaultValue={order.articleNumber} required/>

            <label htmlFor="quantity">Quantity</label>
            <input type="number"  name="quantity" id="quantity" className={pending ? "loading" : ""} defaultValue={order.quantity} required/>

            <label htmlFor="orderNumber">Order &#8470;</label>
            <input type="text"  name="orderNumber" id="orderNumber" className={pending ? "loading" : ""} defaultValue={order.orderNumber} required/>

            <label htmlFor="expected">Expected on</label>
            <input type="date"  name="expected" id="expected" className={pending ? "loading" : ""} defaultValue={order.expected} required/>


            {handlePending 
                ? <div className="loader-clock">
                    <SmallLoader />
                </div>
                
                :<button>
                        {orderId ? "Edit" : "Create"}
                 </button>
            }
        </form>
    </div>
)
}