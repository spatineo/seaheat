import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toLonLat } from 'ol/proj';
import { config } from '../../config';

interface TemperatureProfileQuery {
    location: number[] | null
}

// Define a service using a base URL and expected endpoints
export const edrApi = createApi({
  reducerPath: 'edrApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://data.fmi.fi/fmi-apikey/${config.fmiApiKey}/edr/collections/harmonie_skandinavia_mallipinta/` }),
  endpoints: (builder) => ({
    getTemperatureProfile: builder.query<unknown, TemperatureProfileQuery>({
      queryFn: async (q, _api, _extraOptions, baseQuery) => {
        if (q.location === null) {
          return new Promise((resolve) => resolve({ data: {} }));
        }

        const lonLat = toLonLat(q.location, config.projection);

        const qs = new URLSearchParams();
        qs.append('coords', `POINT(${lonLat.join(' ')})`)
        qs.append('parameter-name', 'geomheight,temperature,humidity')
        qs.append('datetime', new Date().toISOString().substring(0,10)+'T12:00Z')
        qs.append('foo', q.location.join(' '))
        const query = `position?${qs.toString()}`
        
        return await baseQuery(query);
      }
    }),
  }),
})

export const { useGetTemperatureProfileQuery } = edrApi
