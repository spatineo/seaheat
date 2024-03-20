import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface TemperaturProfileQuery {
    location: number[]
}

// Define a service using a base URL and expected endpoints
export const edrApi = createApi({
  reducerPath: 'edrApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://data.fmi.fi/fmi-apikey/2d20c98c-41be-4c51-a8c9-3e65b811b2ba/edr/collections/harmonie_skandinavia_mallipinta/' }),
  endpoints: (builder) => ({
    getTemperatureProfile: builder.query<object, TemperaturProfileQuery>({
      query: (q) => {
        const qs = new URLSearchParams();
        qs.append('coords', 'POINT(24 60)') // TODO: reproject point
        qs.append('parameter-name', 'geomheight,temperature,humidity')
        qs.append('datetime', new Date().toISOString().substring(0,10)+'T12:00Z')

        return `position?${qs.toString()}`
      }
    }),
  }),
})

export const { useGetTemperatureProfileQuery } = edrApi
