import useGetOrders from "../../hooks/useGetOrders";
import MainLoader from "../loaders/MainLoader";
import ListItem from "./list-item/ListItem";

export default function OrderList(){
    const { orders, loadingOrders, deleteOrder, editOrder } = useGetOrders();
return (
<>
<div className="list">
    { loadingOrders
        ? <MainLoader />
        : (orders.length > 0 
            ?<table>
            <thead>
                <tr>
                    <th>Client &#8470;</th>
                    <th className="clientName">Client name</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Order &#8470;</th>
                    <th>Expected on</th>
                    <th className="creator">Created by</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => <ListItem 
                        key={order.objectId} 
                        order={order} 
                        deleteOrder={deleteOrder}
                        editOrder={editOrder}
                    />)}
            </tbody>
        </table>
        : <table>
            <thead>
                <tr>
                    <td>There are no pending orders</td>
                </tr>
            </thead>
        </table>    
    )
    }
</div>
</>
)
}