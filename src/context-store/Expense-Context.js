import React from "react";

const ExpenseContext = React.createContext({
    expenses: [],
    addExpense: (item) => { },
    getExpense: () => { }
})

export default ExpenseContext;