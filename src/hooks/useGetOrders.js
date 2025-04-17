import { useContext, useEffect, useState } from "react";

import Parse from '../lib/parse';
import ErrorContext from "../context/ErrorContext";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";

export default function useGetOrders() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const { errorSetter } = useContext(ErrorContext);
    const { userSetter } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(()=> {
        setLoadingOrders(false)
        const Order = Parse.Object.extend('Order')
        const query = new Parse.Query(Order);
        let orders = [];
        setLoadingOrders(true)
        query.find()
            .then(data => {
                
                data.map(m => {
                    const objectId = m.id;
                    const dateString = m.attributes.expected 
                    const expected = new Date(dateString).toLocaleDateString()
                    orders.push({...m.attributes, expected, objectId })
                })
                
                setOrders(orders)
                setLoadingOrders(false)
            })
            .catch(err => {
                setLoadingOrders(false)
                if(err.code === 209){
                    localStorage.clear()
                    userSetter({});
                    navigate('/')
                }    
                
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
            errorSetter(error);
            navigate("/orders")
            
            
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
        loadingOrders,
        deleteOrder,
        editOrder
    }
}