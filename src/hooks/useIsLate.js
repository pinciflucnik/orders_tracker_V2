import { useEffect, useState } from "react";
import moment from "moment";


export default function useIsLate(order){
    const [isLate, setIsLate] = useState(false);
    const [warning, setWarning] = useState(false);
    const divider = 86400000;

    useEffect(() => {
        setIsLate(false);
        setWarning(false);
        const today = moment()
        const expected = moment(order.expected)
        
        const timeLeft = expected.diff(today, 'days');
        
    

        if (timeLeft < 2 && timeLeft >= 0){
            setWarning(true)
        }

        if (timeLeft < 0){
            setIsLate(true)
        }

    },[order])

    return {
        isLate,
        warning
    }
}