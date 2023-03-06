import React from "react";

const ExpenseContext = React.createContext({
    expenses: [],
    addExpense: (item)=> {},
})

export default ExpenseContext;