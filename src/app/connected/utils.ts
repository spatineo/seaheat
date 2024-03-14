import { ActionCreatorWithPayload, Dispatch, UnknownAction } from "@reduxjs/toolkit";

function _wrapAction<T>(fn : ActionCreatorWithPayload<T>, dispatch : Dispatch<UnknownAction>) {
    return (value: T) => dispatch(fn(value));
}

export const wrapAction = _wrapAction;