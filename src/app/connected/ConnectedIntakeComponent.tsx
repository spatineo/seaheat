import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth } from "../slices/intake"
import { distanceBetweenPoints, wrapAction } from "./utils"
import { useEffect, useMemo } from "react"
import { useGetTemperatureProfileQuery } from "../services/temperature"
import { useToast } from "@chakra-ui/react"

export const ConnectedIntakeComponent = () => {
    const intakeProps = useSelector((state: RootState) => state.intake)
    const facilityLocation = useSelector((state: RootState) => state.facility.location)
    const dispatch = useDispatch();
    const toast = useToast();

    const { data, error, isLoading } = useGetTemperatureProfileQuery({ location: intakeProps.location })

    const intakeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setDepth: wrapAction(setDepth, dispatch),
    }

    const distanceToFacility : number | undefined = useMemo(() => {
        if (!intakeProps || !intakeProps.location || !facilityLocation) return undefined;

        return distanceBetweenPoints(intakeProps.location, facilityLocation);

    }, [intakeProps, facilityLocation])

    useEffect(() => {
        if (isLoading || !error || !toast) return;

        toast({
            title: 'Unable to load temperature data',
            status: 'error',
            isClosable: true
        })
    }, [toast, error, isLoading])

    console.log('output', data)

    return (
        <>
            <SelectedPointComponent {...intakeProps} {...intakeCallbacks} distanceToFacility={distanceToFacility} />
        </>
    )
}