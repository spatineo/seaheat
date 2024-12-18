import React, { useMemo } from "react"
import { Box, Button, Flex, Select, Spacer, Stack, Text } from "@chakra-ui/react"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { GraphComponent } from "../../components/GraphComponent/GraphComponent"
import { OutputType } from "../slices/data"
import { OutputTitle } from "../../config/graph"
import { setVisibleGraph } from "../slices/uiState"
import { GraphData } from "../../types"
import { download as downloadCsv, generateCsv, mkConfig } from "export-to-csv"
import { scenarios } from "../../config/scenarios"

interface CsvRecord {
  [key: string]: string | number
}

export const GraphView: React.FC = () => {
  const dispatch = useDispatch()
  const graphs = useSelector((state: RootState) => state.data.output)
  const visibleGraph = useSelector((state: RootState) => state.uiState.graph.visibleGraph)

  const exportCsv = (inputData: GraphData) => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true })

    const data: Array<CsvRecord> = inputData.axes.x.values.map((month: string) => ({
      "Month": month
    }))

    inputData.series.forEach((series) => {
      series.values.forEach((value, idx) => {
        data[idx][series.label] = value
      })
    })

    const csv = generateCsv(csvConfig)(data)
    downloadCsv(csvConfig)(csv)
  }

  const graph = useMemo(() => {
    if (!graphs[visibleGraph] || graphs[visibleGraph].series.length === 0) {
      return null
    }

    const scenario = scenarios.find(s => s.id === graphs[visibleGraph].scenarioId)

    return {
      data: graphs[visibleGraph],
      scenario
    }
  }, [visibleGraph, graphs])

  return (
    <Box borderWidth='1px' borderRadius='lg' padding={0} height='100%' width='100%'>
      <Flex w='100%' padding={2} position="relative">
        <Box>
          <Select value={visibleGraph} onChange={(evt) => dispatch(setVisibleGraph(evt.target.value as OutputType))}>
            {Object.values(OutputType).filter((v) => isNaN(Number(v))).map((key) =>
              <option value={key} key={key}>{OutputTitle.get(key)}</option>
            )}
          </Select>
        </Box>
        <Spacer />
        <Stack direction='row' spacing={3} align='baseline'>
          <Text fontSize='xl'>{graph ? `${graph.data.series[0]?.label} (${graph.data.unit})` : ''}</Text>
          <Text fontSize='m' color='#888'>{graph?.scenario ? `${graph.scenario.name}` : ''}</Text>
        </Stack>
        <Spacer />
        <Box mr="2" position="relative">
          <Button onClick={() => graph && exportCsv(graph.data)} mr="2">Download CSV</Button>
        </Box>
      </Flex>
      {(graph === null || graph.data.series.length === 0)
        ? <Box position="relative" ml="2">No data series</Box>
        : <GraphComponent data={graph.data} height={150} />}
    </Box>
  )
}
