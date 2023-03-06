import { useState } from "react";
import ExpenseContext from "./Expense-Context"
import axios from "axios";

const categories = ['Food', 'Petrol', 'Electronics'];

const ExpenseProvider = (props) => {

    const [expenses, setExpenses] = useState([]);
    const [state, setState] = useState({
        amount: '',
        description: '',
        category: categories[0]
    })
    const [editingMode, setEditingMode] = useState(false);
    const [retrievedId, setRetrievedId] = useState(null);

    const addExpense = async (item) => {
        try {
            const userName = JSON.parse(localStorage.getItem('userName'))
            if (!editingMode) {
                const res = await axios.post(`https://expense-tracker-1152b-default-rtdb.firebaseio.com/expenses/${userName}.json`, item)
                console.log("add", res);
                if (res.status) {
                    alert('Expense Added');
                    getExpense();
                }
            } else {
                const res = await axios.put(`https://expense-tracker-1152b-default-rtdb.firebaseio.com/expenses/${userName}/${retrievedId}.json`, item)
                console.log("edit", res);
                if (res.status) {
                    alert('Expense Edited');
                    getExpense();
                    setEditingMode(false);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getExpense = async () => {
        try {
            const userName = JSON.parse(localStorage.getItem('userName'))
            const res = await axios.get(`https://expense-tracker-1152b-default-rtdb.firebaseio.com/expenses/${userName}.json`)
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

    const deleteExpense = async (id) => {
        try {
            const userName = JSON.parse(localStorage.getItem('userName'))
            setRetrievedId(id);
            const res = await axios.delete(`https://expense-tracker-1152b-default-rtdb.firebaseio.com/expenses/${userName}/${retrievedId}.json`)
            if (res.status) {
                console.log('Expense successfuly deleted')
                getExpense();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const editExpense = (id) => {
        try {
            setRetrievedId(id)
            setEditingMode(true);
            const editItem = expenses.find((item) => item.id === id);
            setState({
                amount: editItem.amount,
                description: editItem.description,
                category: editItem.category
            })
        } catch (err) {
            console.log(err);
        }
    }

    const expenseContext = {
        expenses: expenses,
        addExpense: addExpense,
        getExpense: getExpense,
        deleteExpense: deleteExpense,
        edit: editExpense,
        state: state,
        setState: setState
    }
    return (
        <ExpenseContext.Provider value={expenseContext}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseProvider