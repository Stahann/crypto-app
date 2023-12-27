import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '0cf026dcbemsh6c3e338c44f81d8p1b404djsn3c6ed56cfa28',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
}

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1'

const createRequest = (url: string, params?: {}) => ({
    url,
    headers: cryptoNewsHeaders,
    params,
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query<
            { data: any[] },
            { limit: number | undefined }
        >({
            query: (args) => createRequest('/coindesk', args),
            transformResponse: (rawResult: { data: any[] }, meta) => {
                const url = meta?.request.url || ''

                const searchParams = new URLSearchParams(new URL(url).search)
                const limit = searchParams.get('limit')

                if (limit) {
                    const slicedData: any[] = rawResult?.data.slice(0, 5)
                    return { data: slicedData }
                }
                return rawResult
            },
        }),
    }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
