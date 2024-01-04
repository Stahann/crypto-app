import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICryptosHistory } from '../types/cryptos/cryptos-history.types'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '0cf026dcbemsh6c3e338c44f81d8p1b404djsn3c6ed56cfa28',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url: string, params?: {}) => ({
    url,
    headers: cryptoApiHeaders,
    params,
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query<any, { limit: number }>({
            query: (args) => createRequest('/coins', args),
        }),
        getCryptoDetails: builder.query<any, { coinId: string }>({
            query: (args) => createRequest(`/coin/${args.coinId}`),
        }),
        getCryptoHistory: builder.query<
            ICryptosHistory,
            { coinId: string; timePeriod: string }
        >({
            query: (args) =>
                createRequest(`/coin/${args.coinId}/history`, {
                    timePeriod: args.timePeriod,
                }),
        }),
    }),
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi
