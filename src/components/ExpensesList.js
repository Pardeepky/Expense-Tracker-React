import React, { useContext, useEffect } from 'react';
import { Table } from 'reactstrap';
import ExpenseContext from '../context-store/Expense-Context'

const ExpensesList = () => {

    const expCtx = useContext(ExpenseContext);

    const handleDelete = (id) => {
        expCtx.deleteExpense(id);
    }

    const handleEdit = (id) => {
        expCtx.edit(id)
    }

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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expCtx.expenses.map((item) => (
                        <tr key={item.id}>
                            <td>{item.amount}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td><button className='btn btn-success' onClick={() => handleEdit(item.id)}>Edit</button></td>
                            <td><button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ExpensesList