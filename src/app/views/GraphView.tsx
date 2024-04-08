import { Box, Flex, Select } from "@chakra-ui/react"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { GraphComponent } from "../../components/GraphComponent/GraphComponent"
import { OutputType } from "../slices/data"
import { OutputTitle } from "../../config/graph"
import { setVisibleGraph } from "../slices/uiState"

export const GraphView = () => {
    const dispatch = useDispatch()
    const graphs = useSelector((state: RootState) => state.data.output)
    const visibleGraph = useSelector((state: RootState) => state.uiState.graph.visibleGraph)

    return (
        <Box borderWidth='1px' borderRadius='lg' padding={0} height='100%' width='100%'>
            <Flex w='33%' padding={2}>
                <Select value={visibleGraph} onChange={(evt) => dispatch(setVisibleGraph(evt.target.value as OutputType))}>
                    {Object.values(OutputType).filter((v) => isNaN(Number(v))).map((key) => 
                    <option value={key} key={key}>{OutputTitle.get(key)}</option>
                )}
                </Select>
            </Flex>
            <GraphComponent data={graphs[visibleGraph]} height={150} />
        </Box>
    )
}