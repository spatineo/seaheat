import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { ConnectedIntakeComponent } from "../connected/ConnectedIntakeComponent"

export const SelectedPointView = () => {
    return (
        <Box>
            <Tabs>
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