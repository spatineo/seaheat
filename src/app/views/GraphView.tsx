import { Box, Button, Flex, Select, Spacer } from "@chakra-ui/react"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { GraphComponent } from "../../components/GraphComponent/GraphComponent"
import { OutputType } from "../slices/data"
import { OutputTitle } from "../../config/graph"
import { setVisibleGraph } from "../slices/uiState"
import { GraphData } from "../../types"
import { download as downloadCsv, generateCsv, mkConfig } from "export-to-csv"

interface CsvRecord {
    [key: string]: string|number
}

export const GraphView = () => {
    const dispatch = useDispatch()
    const graphs = useSelector((state: RootState) => state.data.output)
    const visibleGraph = useSelector((state: RootState) => state.uiState.graph.visibleGraph)

    const exportCsv = (inputData : GraphData) => {

        const csvConfig = mkConfig({ useKeysAsHeaders: true });

        const data : Array<CsvRecord> = inputData.axes.x.values.map((month : string) => ({
            "Month": month
        }))

        inputData.series.forEach((series) => {
            series.values.forEach((value, idx) => {
                data[idx][series.label] = value
            })
        })

        const csv = generateCsv(csvConfig)(data);
        downloadCsv(csvConfig)(csv)
    }

    return (
        <Box borderWidth='1px' borderRadius='lg' padding={0} height='100%' width='100%'>
            <Flex w='100%' padding={2}>
                <Box>
                    <Select value={visibleGraph} onChange={(evt) => dispatch(setVisibleGraph(evt.target.value as OutputType))}>
                        {Object.values(OutputType).filter((v) => isNaN(Number(v))).map((key) => 
                        <option value={key} key={key}>{OutputTitle.get(key)}</option>
                    )}
                    </Select>
                </Box>
                <Spacer />
                <Box>
                    <Button onClick={() => exportCsv(graphs[visibleGraph])}>Download CSV</Button>
                </Box>
            </Flex>
            <GraphComponent data={graphs[visibleGraph]} height={150} />
        </Box>
    )
}