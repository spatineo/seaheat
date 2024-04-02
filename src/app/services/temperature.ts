import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toLonLat } from 'ol/proj';
import { config } from '../../config/app';
import { TemperatureData } from '../../types';
import { transformCoverageJSONToTemperatureProps } from '../../processing/util/transformCoverageJSON';
import { emptyTemperatureData } from '../../types/temperature';

import { roundToNearestHours, addHours } from 'date-fns'

interface TemperatureProfileQuery {
    location: number[] | null
}

// Define a service using a base URL and expected endpoints
export const edrApi = createApi({
  reducerPath: 'edrApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://data.fmi.fi/fmi-apikey/${config.fmiApiKey}/edr/collections/harmonie_skandinavia_mallipinta/` }),
  endpoints: (builder) => ({
    getTemperatureProfile: builder.query<TemperatureData, TemperatureProfileQuery>({
      queryFn: async (q, _api, _extraOptions, baseQuery) => {

        if (q.location === null) {
          return new Promise((resolve) => resolve({ data: emptyTemperatureData().data }));
        }

        const lonLat = toLonLat(q.location, config.projection);

        const qs = new URLSearchParams();
        qs.append('coords', `POINT(${lonLat.join(' ')})`)
        qs.append('parameter-name', 'geomheight,temperature,humidity')
        
        const now = roundToNearestHours(new Date(), { roundingMethod: 'ceil' });
        const datetimes = [0,1,2,3,4,5,6,7,8,9,10,11].map((n) => addHours(now, n*4))

        const queries = datetimes.map((datetime) => {
          const tmp = new URLSearchParams(qs)
          tmp.append('datetime', datetime.toISOString())
          const query = `position?${tmp.toString()}`
          return baseQuery(query);
        })

        const ret = await Promise.all(queries);

        return new Promise((resolve, reject) => {
          const error = ret.find((r) => r.error)?.error;
          if (error) { resolve({ error }) }

          try {
            const converted = transformCoverageJSONToTemperatureProps(ret.map((r) => r.data));

            resolve({ data: converted.data })
          } catch(err) {
            reject(err);
          }
        });

      }
    }),
  }),
})

export const { useGetTemperatureProfileQuery } = edrApi
