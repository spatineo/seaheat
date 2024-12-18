import React from "react"
import { Box, Select, Text } from "@chakra-ui/react"
import { scenarios } from "../../config/scenarios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setScenario } from "../slices/uiState"

export const ConnectedScenarioSelectView: React.FC = () => {
  const dispatch = useDispatch()
  const currentScenario = useSelector((state: RootState) => state.uiState.scenario)

  return (
    <Box mb="6" mt="2">
      <Text>Scenario</Text>
      <Select onChange={(evt) => dispatch(setScenario(evt.target.value)) }
        value={currentScenario}>
        {scenarios.map((s, oIdx) => (
          <option value={s.id} key={oIdx}>{s.name}</option>
        ))}
      </Select>
    </Box>
  )
}
