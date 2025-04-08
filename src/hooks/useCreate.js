import { useContext, useEffect } from "react";

import Parse from 'parse/dist/parse.min.js';

import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function useCreate() {
    const {user, isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=> {
        Parse.initialize(
            import.meta.env.VITE_APP_ID,
            import.meta.env.VITE_JS_KEY
        );
        Parse.serverURL = "https://parseapi.back4app.com/";
    })

    
    const addOrder = async (formData) => {
        if(!isAuthenticated){
            //TODO redirect to 403
            console.log('u r here');
            return;
        }
        const data = {...Object.fromEntries(formData)};
        data.creator = user.username;
        data.orderDate = new Date().toLocaleDateString;
        
        const Order = Parse.Object.extend("Order")
        const order = new Order();

        order.set("clientNumber", data.clientNumber)
        order.set("clientName", data.clientName)
        order.set("articleNumber", data.articleNumber)
        order.set("quantity", data.quantity)
        order.set("orderNumber", data.orderNumber)
        order.set("expected", data.expected)
        order.set("orderDate", data.orderDate)
        order.set("creator", data.creator)
        try {
            const savedOrder = await order.save();
            navigate('/orders');
            console.log(savedOrder);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        addOrder,
    }
}