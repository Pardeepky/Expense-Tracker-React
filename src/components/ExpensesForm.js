import React, { useContext, useState } from 'react';
import { FormGroup, Label, Input, Form, Button, Col, Row } from 'reactstrap';
import ExpenseContext from '../context-store/Expense-Context';

const categories = ['Food', 'Petrol', 'Electronics'];

const ExpensesForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const expCtx = useContext(ExpenseContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        expCtx.addExpense({ amount: amount, description: description, category: category });
    };

    return (
        <div className='container card bg-light text-dark'>
            <h3 className='text-center m-2'>Add Expense</h3>
            <Form className='m-5' onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="amount">Amount:</Label>
                            <Input
                                type="number"
                                name="amount"
                                id="amount"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="description">Description:</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="category">Category:</Label>
                            <Input
                                type="select"
                                name="category"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Button color="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ExpensesForm;