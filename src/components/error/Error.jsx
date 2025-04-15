import { useContext } from "react"
import ErrorContext from "../../context/ErrorContext"

export default function Error() {
    const { error } = useContext(ErrorContext)
    return (
        error 
            ?<div className="error">
                <h2>{error}</h2>
            </div>
            : <></>
    
    )
}