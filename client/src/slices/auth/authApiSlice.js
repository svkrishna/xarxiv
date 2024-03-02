import { apiSlice } from "../";

const USERS_URL = "api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/profile`,
      }),
    }),
    getAllUsersList: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/getAllUsers`,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body,
      }),
    }),
    toggleUserRole: builder.mutation({
      query: ({ userId }) => ({
        url: `${USERS_URL}/toggleRole/${userId}`,
        method: "PATCH",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useGetUserProfileQuery,
  useGetAllUsersListQuery,
  useUpdateUserProfileMutation,
  useLogoutMutation,
  //
  useToggleUserRoleMutation,
} = userApiSlice;
