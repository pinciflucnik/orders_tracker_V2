import { useEffect, useState } from "react";

import Parse from 'parse/dist/parse.min.js';

export default function useGetOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        Parse.initialize(
            import.meta.env.VITE_APP_ID,
            import.meta.env.VITE_JS_KEY
        );
        Parse.serverURL = "https://parseapi.back4app.com/";
        const Order = Parse.Object.extend('Order')
        const query = new Parse.Query(Order);
        let orders = [];
        query.find()
            .then(data => {
                data.map(m => {
                    const objectId = m.id;
                    const dateString = m.attributes.expected 
                    const expected = new Date(dateString).toLocaleDateString()
                    orders.push({...m.attributes, expected, objectId })
                })
                
                setOrders(orders)
            })
    },[])

    return orders;
}