import { Box, Text } from "@chakra-ui/react"
import { ConnectedIntakeComponent } from "../connected/ConnectedIntakeComponent"

export const SelectedPointView = () => {
    return (
        <Box>
            <Text>Selected point</Text>
            <ConnectedIntakeComponent />
        </Box>
    )
}