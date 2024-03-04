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
    getAllPapers: builder.query({
      query: () => ({
        url: `${USERS_URL}/getAllPapers`,
      }),
    }),
  }),
});

export const {
  useSubmitPaperMutation,
  useGetMyPapersQuery,
  useGetAllPapersQuery,
} = userApiSlice;
