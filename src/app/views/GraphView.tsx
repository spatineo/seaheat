import { Box } from "@chakra-ui/react"
import { RootState } from "../../store"
import { useSelector } from "react-redux"
import { GraphComponent } from "../../components/GraphComponent/GraphComponent"

export const GraphView = () => {
    const monthlyAveragePowerOutput = useSelector((state: RootState) => state.data.output.monthlyAveragePowerOutput)
    console.log('m', monthlyAveragePowerOutput)
    return (
        <Box width='100%'>
            <GraphComponent data={monthlyAveragePowerOutput} height={200} />
        </Box>
    )
}