import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import Register from "../../pages/Auth/Register";

export const userApiSlice = apiSlice.injectEndpoints({
  // even apple can be used
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/api/users`,
        method: "POST",
        body: data,
      }),
    }),  
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

  }),  
  
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApiSlice;

/*
This file does not hold the state like a traditional Redux slice does.
Instead, this file is for making API requests related to users using RTK Query.

Concept	Where It Happens
Actual user data storage => authSlice.js (Redux slice)
Fetch/update user from backend => userApiSlice.js (RTK Query)

Ln5:-
We are injecting user-specific endpoints into your global API slice.


Basically in this file, we are defining an API endpoint for login using RTK Query.

1)endpoints: (builder) => ({ ... })

This sets up all your API functions (login, logout, register, etc.).

builder is like a tool that helps create different types of API calls.

2)login: builder.mutation({...})

You are defining a mutation called login.

A mutation is for things that change data, like logging in, creating a user, etc.

3)query: (data) => ({ ... })

This tells RTK Query how to make the request.

data is the input (like { email, password }).
*/