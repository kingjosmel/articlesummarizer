import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
    reduscerPath : 'articleApi',
    baseQuery : fetchBaseQuery({
        baseUrl : ''
    })
    endpoints : (builder) => ({
        getSummary: builder.query({
            qurey: (params) => 'test'
        })
    })
})