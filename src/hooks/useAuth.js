import { useContext, useEffect } from "react";

import Parse from 'parse/dist/parse.min.js';
// import * as request from '../lib/requester'
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";


export default function useAuth() {
    const { userSetter } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=> {
        Parse.initialize(
            import.meta.env.VITE_APP_ID,
            import.meta.env.VITE_JS_KEY
        );
        Parse.serverURL = "https://parseapi.back4app.com/";
    })

    const myLogin = async (data) => {

        try {
            await Parse.User.logIn(data.get('username'), data.get('password'))
            const loggedUser = JSON.parse(localStorage.getItem(`Parse/${import.meta.env.VITE_APP_ID}/currentUser`))
            const user = {
                id: loggedUser.objectId,
                email: loggedUser.email,
                username: loggedUser.username,
                accessToken: loggedUser.sessionToken
            }
            userSetter(user);
            navigate('/orders')
            console.log(user);
        } catch (error) {
            console.log(error);
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
        // register,
    }
}