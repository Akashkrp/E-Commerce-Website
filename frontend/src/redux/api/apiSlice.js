import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});


/*
What Does a Redux Slice Do?
State: It holds a specific portion of the app's state. So, for example, the "user slice" holds user-related data, and the "product slice" holds product data.

Reducers: It includes functions that change the state (just like how you might cut or eat a slice of pizza, causing it to change!).

Actions: These describe what should happen with that slice of pizza, like "add more cheese" (update the user info), or "add toppings" (add a new product).

This file sets up a base API slice that allows you to create API slices for entities like User, Category, Product, and Order.

createApi – sets up the whole API system.

fetchBaseQuery – a simple function to make HTTP requests (like GET, POST, etc.).

*/