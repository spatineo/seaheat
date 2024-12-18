import React from "react"
import { Box, Select, Stack, Text } from "@chakra-ui/react"
import { functions, scenarios } from "../../config/scenarios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setFunctionId, setScenarioId } from "../slices/uiState"

export const ConnectedScenarioSelectView: React.FC = () => {
  const dispatch = useDispatch()
  const currentScenarioId = useSelector((state: RootState) => state.uiState.dataSource.scenarioId)
  const currentFunctionId = useSelector((state: RootState) => state.uiState.dataSource.functionId)

  return (
    <Stack direction="row" mt="2">
      <Box width="20vw">
        <Text>Scenario</Text>
        <Select onChange={(evt) => dispatch(setScenarioId(evt.target.value)) }
          value={currentScenarioId}>
          {scenarios.map((s, oIdx) => (
            <option value={s.id} key={oIdx}>{s.name}</option>
          ))}
        </Select>
      </Box>
      <Box width="20vw">
        <Text>Function</Text>
        <Select onChange={(evt) => dispatch(setFunctionId(evt.target.value)) }
          value={currentFunctionId}>
          {functions.filter(s => s.id !== 'timstd').map((s, oIdx) => (
            <option value={s.id} key={oIdx}>{s.name}</option>
          ))}
        </Select>
      </Box>
    </Stack>
  )
}
