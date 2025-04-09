import { useEffect, useState } from "react";

import Parse from 'parse/dist/parse.min.js';

export default function useGetOne(id) {
    const [order, setOrder] = useState({})
    const [pending, setPending] = useState(false)

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
                console.log(err)
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