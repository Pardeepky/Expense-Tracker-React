import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    expenses: [],
    activatePremium: false
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses = action.payload;
        },
        premium: (state)=>{
            state.activatePremium = true;
        }
    }
})

export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer

