import { useContext, useEffect, useState } from "react";

import Parse from 'parse/dist/parse.min.js';
import ErrorContext from "../context/ErrorContext";

export default function useGetOne(id) {
    const [order, setOrder] = useState({})
    const [pending, setPending] = useState(false)
    const { errorSetter } = useContext(ErrorContext)

    useEffect(() => {
        Parse.initialize(
            import.meta.env.VITE_APP_ID,
            import.meta.env.VITE_JS_KEY
        );
        Parse.serverURL = "https://parseapi.back4app.com/";

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