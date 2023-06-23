

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: builder => ({
        addNewQuestion: builder.mutation({
            query: (Question) => ({
              url: '/',
              method: 'POST',
              // Include the entire post object as the body of the request
              body: Question
            })
          })
    })
  })
  
  export const { useAddNewQuestionMutation } = apiSlice;
  export default apiSlice;