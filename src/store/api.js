import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}), // baseUrl змінюється на ваш URL API
    tagTypes: ['Operation', 'Session', 'Expenses'],
    endpoints: (builder) => ({
        getSessions: builder.query({
            query: () => '/sessions',
            providesTags: ['Session']
        }),
        getSessionById: builder.query({
            query: (id) => `/sessions/${id}`,
            providesTags: (result, error, id) => {
                console.log({result, error, id});
                return [{type: 'Session', id}]
            }
        }),
        getUserOperations: builder.query({
            query: (id) => `/operations/${id}`,
            providesTags: ['Operation'],
        }),
        purchaseTicket: builder.mutation({
            query: ({body}) => ({
                url: `/operations`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, {id}) => {
                console.log({result, error, id});
                return [{type: 'Session', id: id.toString()}, "Session"];
            },
        }),
        getAllExpenseCategories: builder.query({
            query: () => `/finances/expenses/categories`
        }),
        getAllDailyIncomes: builder.query({
            query: () => `/finances/incomes/daily`
        }),
        getAllDailyExpenses: builder.query({
            query: () => `/finances/expenses/daily`,
            providesTags: ["Expenses"]
        }),
        getAllMonthlyIncomes: builder.query({
            query: () => `/finances/incomes/monthly`
        }),
        getAllMonthlyExpenses: builder.query({
            query: () => `/finances/expenses/monthly`,
            providesTags: ["Expenses"]
        }),
        createExpense: builder.mutation({
            query: (body) => ({
                url: `/finances/expenses`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Expenses"],
        }),
    }),
});

export const {
    useGetAllExpenseCategoriesQuery, useGetAllDailyIncomesQuery, useGetAllDailyExpensesQuery,
    useGetAllMonthlyIncomesQuery, useGetAllMonthlyExpensesQuery, useCreateExpenseMutation,
    useGetSessionsQuery, useGetSessionByIdQuery, usePurchaseTicketMutation, useGetUserOperationsQuery
} = api;