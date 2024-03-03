import { apiSlice } from "../";

const USERS_URL = "api/papers";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitPaper: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/submitPaper`,
        method: "POST",
        body: data,
      }),
    }),
    getMyPapers: builder.query({
      query: () => ({
        url: `${USERS_URL}/getMyPapers`,
      }),
    }),
  }),
});

export const { useSubmitPaperMutation, useGetMyPapersQuery } = userApiSlice;
