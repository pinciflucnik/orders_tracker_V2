import useGetOrders from "../../hooks/useGetOrders";
import ListItem from "./list-item/ListItem";

export default function OrderList(){
    const { orders, deleteOrder, editOrder } = useGetOrders();
return (
<>
<div>
    <table>
        <thead>
            <tr>
                <th>Client &#8470;</th>
                <th>Client name</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Order &#8470;</th>
                <th>Expected on</th>
                <th>Created by</th>
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
</div>
</>
)
}