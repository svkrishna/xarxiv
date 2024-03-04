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
    getPaperDetailsById: builder.query({
      query: (paperId) => ({
        url: `${USERS_URL}/getPaperDetailsById/${paperId}`,
      }),
    }),
    addCommentToPaper: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/addComment/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ paperId, commentId, data }) => ({
        url: `${USERS_URL}/updateComment/${paperId}/${commentId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ paperId, commentId }) => ({
        url: `${USERS_URL}/deleteComment/${paperId}/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSubmitPaperMutation,
  useGetMyPapersQuery,
  useGetAllPapersQuery,
  useGetPaperDetailsByIdQuery,
  //comment
  useAddCommentToPaperMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = userApiSlice;
