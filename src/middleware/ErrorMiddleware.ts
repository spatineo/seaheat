import { createAction, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { RootState, AppDispatch } from "../store";
import { createStandaloneToast } from "@chakra-ui/react";

export const processingError = createAction<string>('PROCESSING_ERROR');

export const errorMiddleware = createListenerMiddleware()
const startAppListening = errorMiddleware.startListening.withTypes<RootState, AppDispatch>()

const { toast } = createStandaloneToast({
    defaultOptions: {
        isClosable: true,
        duration: null
    }
})

startAppListening({
    matcher: isAnyOf(processingError),
    effect: async (action) => {
        toast({
            title: `${action.payload}`,
            status: 'error'
        })
    }
});
