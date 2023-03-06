import React, { useContext, useEffect } from 'react';
import { Table } from 'reactstrap';
import ExpenseContext from '../context-store/Expense-Context'

const ExpensesList = () => {

    const expCtx = useContext(ExpenseContext);

    useEffect(() => {
        expCtx.getExpense();
    }, []);

    return (
        <div className='card m-5 bg-secondary text-white'>
            <h3 className='text-center m-2'>Expense List</h3>
            <Table className='container mb-5 text-white'>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {expCtx.expenses.map((item) => (
                        <tr key={item.id}>
                            <td>{item.amount}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ExpensesList