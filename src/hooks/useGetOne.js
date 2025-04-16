import { useContext, useEffect, useState } from "react";

import Parse from '../lib/parse';
import ErrorContext from "../context/ErrorContext";

export default function useGetOne(id) {
    const [order, setOrder] = useState({})
    const [pending, setPending] = useState(false)
    const { errorSetter } = useContext(ErrorContext)

    useEffect(() => {
        const Order = Parse.Object.extend('Order')
        const query = new Parse.Query(Order);
        if(!id){
            setOrder({});
            return
        }
        setPending(true)
        query.get(id)
            .then(data => {
                setOrder(data.attributes)
                setPending(false)
            })
            .catch(err => {
                errorSetter(err)
                setPending(false)
            })

    },[id])
    const orderSetter = (newState) => {
        setOrder(newState)
    }

    return {
        order,
        pending, 
        orderSetter
    }

}