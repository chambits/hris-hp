import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../constants';
import { endpoints } from '../../../endpoints';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => endpoints.employees, // Adjust the endpoint as needed
    }),
  }),
});

export const { useGetEmployeesQuery } = employeesApi;
