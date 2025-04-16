import { useContext, useEffect, useState } from "react";

import Parse from '../lib/parse';
// import * as request from '../lib/requester'
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";
import ErrorContext from "../context/ErrorContext";


export default function useAuth() {
    const [pending, setPending] = useState(false)
    const { userSetter } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext)
    const navigate = useNavigate();


    const myLogin = async (data) => {
        setPending(false);
        try {
            setPending(true)
            const username = data.get('username');
            const password = data.get('password')
            if (!username || !password){
                errorSetter('Please fill all the fields')
                setPending(false)
                return;
            }
            await Parse.User.logIn(username, password)
            const loggedUser = JSON.parse(localStorage.getItem(`Parse/${import.meta.env.VITE_APP_ID}/currentUser`))
            const user = {
                id: loggedUser.objectId,
                email: loggedUser.email,
                username: loggedUser.username,
                accessToken: loggedUser.sessionToken
            }
            setPending(false)
            userSetter(user);
            navigate('/orders')
            console.log(user);
        } catch (error) {
            errorSetter(error)
            setPending(false)
        }
    }

    const myLogout = async () => {
        try {
            await Parse.User.logOut();
            userSetter({});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    // const register = async (data) => {

    //     if(data.get('password') !== data.get('rePass')){
    //         //SET ERROR HERE
    //         return;
    //     }
        
    //     try {
    //         const user = await request.post('users', {
    //            username: data.get('username'),
    //            password: data.get('password'),
    //            email: data.get('email'),
    //         })
    //         console.log(user);

            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return {
        myLogin,
        myLogout,
        pending,
        // register,
    }
}