import {
    useContext,
    useEffect,
    useState
} from "react";

import Parse from 'parse/dist/parse.min.js';

import AuthContext from "../context/AuthContext";
import {
    useNavigate
} from "react-router";

export default function useCreate() {
    const {
        user,
        isAuthenticated
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [handlePending, setHandlePending] = useState(false);

    useEffect(() => {
        Parse.initialize(
            import.meta.env.VITE_APP_ID,
            import.meta.env.VITE_JS_KEY
        );
        Parse.serverURL = "https://parseapi.back4app.com/";
    })


    const handleOrder = async (id, formData) => {
        if (!isAuthenticated) {
            //TODO set error
            console.log('u r here');
            return;
        }
        setHandlePending(false)

        const data = {
            ...Object.fromEntries(formData)
        };
        data.creator = user.username;
        data.orderDate = new Date().toLocaleDateString;

        const Order = Parse.Object.extend("Order")
        let order
        setHandlePending(true)
        try {
            if (!id) {
                order = new Order();
            } else {
                const query = new Parse.Query(Order);
                order = await query.get(id);

            }

            order.set("clientNumber", data.clientNumber)
            order.set("clientName", data.clientName)
            order.set("articleNumber", data.articleNumber)
            order.set("quantity", data.quantity)
            order.set("orderNumber", data.orderNumber)
            order.set("expected", data.expected)
            order.set("orderDate", data.orderDate)
            order.set("creator", data.creator)
            const savedOrder = await order.save();
            setHandlePending(false)
            navigate('/orders');

            console.log(savedOrder);
        } catch (error) {
            console.log(error);
            setHandlePending(false)
        }

    }

    return {
        handleOrder,
        handlePending
    }
}