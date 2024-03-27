import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toLonLat } from 'ol/proj';
import { config } from '../../config/app';
import { TemperatureProps } from '../../types';
import { transformCoverageJSONToTemperatureProps } from '../../processing/util/transformCoverageJSON';

interface TemperatureProfileQuery {
    location: number[] | null
}

// Define a service using a base URL and expected endpoints
export const edrApi = createApi({
  reducerPath: 'edrApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://data.fmi.fi/fmi-apikey/${config.fmiApiKey}/edr/collections/harmonie_skandinavia_mallipinta/` }),
  endpoints: (builder) => ({
    getTemperatureProfile: builder.query<TemperatureProps, TemperatureProfileQuery>({
      queryFn: async (q, _api, _extraOptions, baseQuery) => {

        if (q.location === null) {
          const fakeData : TemperatureProps = { axes: { x: { label: 'N/A', values: [] }, y: { label: 'N/A', values: [] }}, ticks: [], data: [], legend: [], seabedDepth: 0};
          return new Promise((resolve) => resolve({ data: fakeData }));
        }

        const lonLat = toLonLat(q.location, config.projection);

        const qs = new URLSearchParams();
        qs.append('coords', `POINT(${lonLat.join(' ')})`)
        qs.append('parameter-name', 'geomheight,temperature,humidity')
        qs.append('datetime', new Date().toISOString().substring(0,10)+'T12:00Z')
        const query = `position?${qs.toString()}`
        
        const ret = await baseQuery(query)
        return new Promise((resolve, reject) => {
          if (ret.error) { resolve({ error: ret.error }) }

          try {
            const converted = transformCoverageJSONToTemperatureProps(ret.data) as TemperatureProps;

            resolve({ data: converted })
          } catch(err) {
            reject(err);
          }
        });

      }
    }),
  }),
})

export const { useGetTemperatureProfileQuery } = edrApi
