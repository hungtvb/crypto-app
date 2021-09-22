import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'b4c0da52cemsh3e2f99ac1fb86b4p155f6fjsnab1dd9aa1450'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetail: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timeperiod}) => createRequest(`/coin/${coinId}/history/${timeperiod}`)
        }),
        getCryptoExchanges: builder.query({
            query: () => createRequest('exchanges')
        })
    })

})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoExchangesQuery,
} = cryptoApi;