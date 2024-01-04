import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'bd0407e96amsh89611f3835585e7p190611jsn1578948ca2d2',
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
            { limit: number | undefined; url: string }
        >({
            query: (args) => createRequest(args.url, args),
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
