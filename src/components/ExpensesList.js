import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import ExpenseContext from '../context-store/Expense-Context'
import { CSVLink, CSVDownload } from "react-csv";

const ExpensesList = () => {

    const expenses = useSelector(state => state.expenses.expenses)

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
                    {expenses.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.amount}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td><button className='btn btn-success' onClick={() => handleEdit(item.id)}>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className='d-flex justify-content-end mb-5 mr-2'>
                <CSVLink data={expenses} className='text-center'><button className='btn btn-success'>Download me</button></CSVLink>
            </div>
        </div>
    );
}

export default ExpensesList