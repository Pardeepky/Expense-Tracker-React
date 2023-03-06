import { useState } from "react";
import ExpenseContext from "./Expense-Context"
import axios from "axios";

const ExpenseProvider = (props) => {

    const [expenses, setExpenses] = useState([]);

    const addExpense = async (item) => {
        try {
            const res = await axios.post('https://expense-tracker-1152b-default-rtdb.firebaseio.com/expenses.json', item)
            console.log(res);
            if (res.status) {
                alert('Expense Added');
                getExpense();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getExpense = async () => {
        try {
            const res = await axios.get('https://expense-tracker-1152b-default-rtdb.firebaseio.com/expenses.json')
            if (res.status) {
                const loadedExpense = [];
                for (const key in res.data) {
                    loadedExpense.push({
                        id: key,
                        amount: res.data[key].amount,
                        description: res.data[key].description,
                        category: res.data[key].category
                    })
                }
                setExpenses(loadedExpense);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const expenseContext = {
        expenses: expenses,
        addExpense: addExpense,
        getExpense: getExpense
    }
    return (
        <ExpenseContext.Provider value={expenseContext}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseProvider