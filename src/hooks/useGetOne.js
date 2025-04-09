import { useEffect, useState } from "react";

import Parse from 'parse/dist/parse.min.js';

export default function useGetOne(id) {
    const [order, setOrder] = useState({})

    useEffect(() => {
        Parse.initialize(
            import.meta.env.VITE_APP_ID,
            import.meta.env.VITE_JS_KEY
        );
        Parse.serverURL = "https://parseapi.back4app.com/";

        const Order = Parse.Object.extend('Order')
        const query = new Parse.Query(Order);

        query.get(id)
            .then(data => {
                setOrder(data.attributes)
            })
            .catch(err => console.log(err))

    },[])

    return order

}