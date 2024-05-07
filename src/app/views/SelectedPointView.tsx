import React from "react"
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { ConnectedIntakeComponent } from "../connected/ConnectedIntakeComponent"

import { useDispatch, useSelector } from "react-redux"
import { SeaheatFeatureType } from "../../types"
import { setSelectedPointTab } from "../slices/uiState"
import { RootState } from "../../store"
import { ConnectedDischargeComponent } from "../connected/ConnectedDischargeComponent"
import { ConnectedFacilityComponent } from "../connected/ConnectedFacilityComponent"

export const SelectedPointView: React.FC = () => {
  const dispatch = useDispatch()

  const currentTab = useSelector((state: RootState) => state.uiState.selectedPointTab)

  const typePerTab = [SeaheatFeatureType.INTAKE, SeaheatFeatureType.FACILITY, SeaheatFeatureType.DISCHARGE]

  const chooseTab = (index: number) => {
    dispatch(setSelectedPointTab(typePerTab[index]))
  }

  return (
    <Box minW="100%" position="relative" pr="4" m="0" boxSizing="border-box">
      <Tabs
        index={typePerTab.indexOf(currentTab)}
        variant='soft-rounded'
        colorScheme='gray'
        isFitted onChange={chooseTab}
        position="relative"
        size="md"
        mt="1"
      >
        <TabList position="relative" gap="1">
          <Tab fontSize="calc(4px + 0.5vw + 0.5vh)">Intake</Tab>
          <Tab fontSize="calc(4px + 0.5vw + 0.5vh)">Facility</Tab>
          <Tab fontSize="calc(4px + 0.5vw + 0.5vh)">Discharge</Tab>
        </TabList>

        <TabPanels position="relative">
          <TabPanel>
            <ConnectedIntakeComponent />
          </TabPanel>
          <TabPanel>
            <ConnectedFacilityComponent />
          </TabPanel>
          <TabPanel>
            <ConnectedDischargeComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
