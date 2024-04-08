import { Box, Flex, Select } from "@chakra-ui/react"
import { RootState } from "../../store"
import { useSelector } from "react-redux"
import { GraphComponent } from "../../components/GraphComponent/GraphComponent"
import { OutputType } from "../slices/data"
import { useState } from "react"
import { OutputTitle } from "../../config/graph"

export const GraphView = () => {
    const graphs = useSelector((state: RootState) => state.data.output)
    const [ selectedGraph, setSelectedGraph] = useState(OutputType.monthlyAveragePowerOutput)

    return (
        <Box borderWidth='1px' borderRadius='lg' padding={0} height='100%' width='100%'>
            <Flex w='33%' padding={2}>
                <Select value={selectedGraph} onChange={(evt) => setSelectedGraph(evt.target.value as unknown as OutputType)}>
                    {Object.values(OutputType).filter((v) => isNaN(Number(v))).map((key) => 
                    <option value={key} key={key}>{OutputTitle.get(key)}</option>
                )}
                </Select>
            </Flex>
            <GraphComponent data={graphs[selectedGraph]} height={150} />
        </Box>
    )
}