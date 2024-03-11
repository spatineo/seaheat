import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Hello } from "../../components/hello/Hello"
import { useEffect, useState } from "react"

export const ConnectedHello = () => {
    const location = useSelector((state: RootState) => state.intake.location)
    
    const [ label, setLabel ] = useState("");

    useEffect(() => {
        let newValue;
        if (location[0] === null || location[1] == null) {
            newValue = 'Unknown';
        } else {
            newValue = `${Number(location[0]).toFixed(2)}, ${Number(location[1]).toFixed(2)}`
        }
        setLabel(newValue);
    }, [location])


    return (<Hello label={label} /> )
}