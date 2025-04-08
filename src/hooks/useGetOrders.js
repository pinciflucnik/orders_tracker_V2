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
            .catch(err => {
                console.log(err);
                
            })
            
    },[])

    const deleteOrder = async (id) => {
        const Order = Parse.Object.extend('Order')
        const query = new Parse.Query(Order);
        try {
            setOrders(oldState => {
                const newState = oldState.map(o => {
                    if(o.objectId === id){
                        o.isOptimistic = true;
                    }
                    return o;
                })
                
                return newState
            })
            const order = await query.get(id);
            
            await order.destroy();
            const newQuery = new Parse.Query(Order);
            const data = await newQuery.find();
            
            let updatedList = [];
            data.map(m => {
                const objectId = m.id;
                const dateString = m.attributes.expected 
                const expected = new Date(dateString).toLocaleDateString()
                updatedList.push({...m.attributes, expected, objectId })
            })

            setOrders(updatedList);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const editOrder = (data, id) => {
        setOrders(oldState => {
            const newState = oldState.map(o => {
                o.objectId == id ? data : o;
            })
            return newState;
        })
    }

    return {
        orders,
        deleteOrder,
        editOrder
    }
}