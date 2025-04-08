import useCreate from "../../hooks/useCreate"

export default function AddOrder(){
    // useCreate has to have orderDate and creator
    const { addOrder } = useCreate();
return (
    <div>
        <form action={addOrder}>
            <label htmlFor="clientNumber">Client &#8470;</label>
            <input type="text" name="clientNumber" id="clientNumber"  required/>
            
            <label htmlFor="clientName">Client name</label>
            <input type="text" name="clientName" id="clientName" required/>

            <label htmlFor="articleNumber">Item</label>
            <input type="text"  name="articleNumber" id="articleNumber" required/>

            <label htmlFor="quantity">Quantity</label>
            <input type="number"  name="quantity" id="quantity" required/>

            <label htmlFor="orderNumber">Order &#8470;</label>
            <input type="text"  name="orderNumber" id="orderNumber" required/>

            <label htmlFor="expected">Expected on</label>
            <input type="date"  name="expected" id="expected" required/>


            <button>Create</button>
        </form>
    </div>
)
}