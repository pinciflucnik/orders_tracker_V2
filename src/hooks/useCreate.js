import {
    useContext,
    useState
} from "react";

import moment from "moment";

import Parse from '../lib/parse';

import AuthContext from "../context/AuthContext";
import {
    useNavigate
} from "react-router";
import ErrorContext from "../context/ErrorContext";

export default function useCreate() {
    const {
        user,
        isAuthenticated
    } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext)
    const navigate = useNavigate();
    const [handlePending, setHandlePending] = useState(false);


    const handleOrder = async (id, formData) => {
        if (!isAuthenticated) {
            errorSetter('You have to be logged in to do that');
            navigate('/');
            return;
        }
        setHandlePending(false)

        const data = {
            ...Object.fromEntries(formData)
        };
        if (
            !data.clientNumber ||
            !data.clientName ||
            !data.articleNumber ||
            !data.quantity ||
            !data.orderNumber ||
            !data.expected 
            ) {
                errorSetter('Please fill all the fields');
                return;
            }
            
        setHandlePending(true)
        data.expected = new Date(data.expected);
               
        data.creator = user.username;
        data.orderDate = new Date();

        const Order = Parse.Object.extend("Order")
        let order
        try {
            if (!id) {
                order = new Order();
                order.set("creator", data.creator)
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
            const savedOrder = await order.save();
            setHandlePending(false)
            navigate('/orders');

            console.log(savedOrder);
        } catch (error) {
            errorSetter(error);
            setHandlePending(false);
        }

    }

    return {
        handleOrder,
        handlePending
    }
}