import { useEffect, useState } from "react";


export default function useIsLate(order){
    const [isLate, setIsLate] = useState(false);
    const [warning, setWarning] = useState(false);
    const divider = 86400000;

    useEffect(() => {
        setIsLate(false);
        setWarning(false);
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const expected = new Date(order.expected.match(/\d+/g).reverse().map(Number));
        const timeLeft = Math.floor((expected - today) / divider);

        console.log(expected);
        console.log(today);

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