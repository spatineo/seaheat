import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { ConnectedIntakeComponent } from "../connected/ConnectedIntakeComponent"

import { useDispatch, useSelector } from "react-redux"
import { SeaheatFeatureType } from "../../types";
import { setSelectedPointTab } from "../slices/uiState";
import { RootState } from "../../store";

export const SelectedPointView = () => {
    const dispatch = useDispatch();

    const currentTab = useSelector((state: RootState) => state.uiState.selectedPointTab)

    const typePerTab = [ SeaheatFeatureType.INTAKE, SeaheatFeatureType.FACILITY, SeaheatFeatureType.DISCHARGE ]

    const chooseTab = (index : number) => {
        dispatch(setSelectedPointTab(typePerTab[index]));
    }

    return (
        <Box>
            <Tabs index={typePerTab.indexOf(currentTab)} variant='enclosed' colorScheme='green' isFitted onChange={chooseTab}>
                <TabList>
                    <Tab>Intake</Tab>
                    <Tab>Facility</Tab>
                    <Tab>Discharge</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ConnectedIntakeComponent />
                    </TabPanel>
                    <TabPanel>
                        <Text>Facility stuff</Text>
                    </TabPanel>
                    <TabPanel>
                        <Text>Discharge stuff</Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}