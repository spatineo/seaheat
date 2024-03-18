import { ActionCreatorWithPayload, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { LineString } from "ol/geom";
import {getLength} from 'ol/sphere.js';

function _wrapAction<T>(fn : ActionCreatorWithPayload<T>, dispatch : Dispatch<UnknownAction>) {
    return (value: T) => dispatch(fn(value));
}

function _distanceBetweenPoints(p1 : number[], p2 : number[]){
    return getLength(new LineString([p1,p2]));
}

export const wrapAction = _wrapAction;
export const distanceBetweenPoints = _distanceBetweenPoints;