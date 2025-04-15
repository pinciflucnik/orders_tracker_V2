import {
    useContext,
    useEffect,
    useState
} from "react";

import moment from "moment";

import Parse from 'parse/dist/parse.min.js';

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
        data.expected = moment(data.expected).format("YYYY-MM-DD")
        
        
        data.creator = user.username;
        data.orderDate = moment().format("YYYY-MM-DD")

        const Order = Parse.Object.extend("Order")
        let order
        setHandlePending(true)
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