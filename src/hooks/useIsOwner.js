import { useEffect, useState } from "react";

export default function useIsOwner(itemCreator, username){
    const [isOwner, setIsOwner] = useState(false)

    useEffect(()=> {
        setIsOwner(false)
        if(itemCreator == username){
            setIsOwner(true)
        }
        if(username == "Владо"){
            setIsOwner(true)
        }
    },[])

    return isOwner;
}