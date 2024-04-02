import { TemperatureData } from "../../types";
import { toLonLat } from "ol/proj";
import { config } from "../../config/app";

import { roundToNearestHours, addHours } from 'date-fns'
import { transformCoverageJSONToTemperatureProps } from "../../processing/util/transformCoverageJSON";

const baseUrl = `https://data.fmi.fi/fmi-apikey/${config.fmiApiKey}/edr/collections/harmonie_skandinavia_mallipinta/`;

export const requestTemperatureData = async (location : number[]) : Promise<TemperatureData> => {

    const lonLat = toLonLat(location, config.projection);

    const qs = new URLSearchParams();
    qs.append('coords', `POINT(${lonLat.join(' ')})`)
    qs.append('parameter-name', 'geomheight,temperature,humidity')
    
    const now = roundToNearestHours(new Date(), { roundingMethod: 'ceil' });
    const datetimes = [0,1,2,3,4,5,6,7,8,9,10,11].map((n) => addHours(now, n*4))

    const queries = datetimes.map((datetime) => {
        const tmp = new URLSearchParams(qs)
        tmp.append('datetime', datetime.toISOString())
        const query = `${baseUrl}position?${tmp.toString()}`
        return fetch(query)
    })

    const responses = await Promise.all(queries);
    const data = await Promise.all(responses.map((r) => r.json()))

    return transformCoverageJSONToTemperatureProps(data);
}