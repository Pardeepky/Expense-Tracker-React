import { useState } from "react";
import ExpenseContext from "./Expense-Context"

const ExpenseProvider = (props) => {

    const [expenses, setExpenses] = useState([]);

    const addExpense = (item) => {
        setExpenses([...expenses, item]);
    };

    const expenseContext = {
        expenses: expenses,
        addExpense: addExpense
    }
    return (
        <ExpenseContext.Provider value={expenseContext}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseProvider