import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../constants';
import { Employee } from './types';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployees: builder.query<
      Employee[],
      Record<string, string | number | boolean> | void
    >({
      query: (params: Record<string, string | number | boolean> = {}) => {
        const queryString = new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        ).toString();
        return `employees${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: [{ type: 'Employees', id: 'LIST' }],
    }),
    updateEmployee: builder.mutation<void, Employee>({
      query: (employee) => ({
        url: `employees/${employee.id}`,
        method: 'PUT',
        body: employee,
      }),
      invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
    }),
    addEmployee: builder.mutation<void, Employee>({
      query: (employee) => ({
        url: 'employees',
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
    }),
    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApi;
