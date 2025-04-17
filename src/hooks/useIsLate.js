import { useEffect, useState } from "react";
import moment from "moment";


export default function useIsLate(order){
    const [isLate, setIsLate] = useState(false);
    const [warning, setWarning] = useState(false);
    const divider = 86400000;

    useEffect(() => {
        setIsLate(false);
        setWarning(false);
        const now = new Date()
        const today = moment(now);
        const formatHelper = order.expected.match(/[0-9]{2}.[0-9]{2}.[0-9]{4}/)[0]
        const expected = moment(formatHelper, "DD/MM/YYYY");

        console.log(today);
        console.log(expected);
        console.log(formatHelper);
        
        const timeLeft = expected.diff(today, 'days');
        
        console.log('---------- timeLeft ----------');
        console.log(timeLeft);

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