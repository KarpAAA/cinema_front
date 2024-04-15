import * as React from 'react';
import './StatsPage.css';
import {BarChart, LineChart} from "@mui/x-charts";
import {
    useCreateExpenseMutation,
    useGetAllDailyExpensesQuery,
    useGetAllDailyIncomesQuery,
    useGetAllExpenseCategoriesQuery,
    useGetAllMonthlyExpensesQuery,
    useGetAllMonthlyIncomesQuery,
} from "../../../store/api";
import {useState} from "react";


export const StatsPage = () => {
    const [formState, setFormState] = useState({
        category: "Rent",
        sum: "0"
    });
    const {data: expenseCategories} = useGetAllExpenseCategoriesQuery();
    const {data: incomesDaily} = useGetAllDailyIncomesQuery();
    const {data: expensesDaily} = useGetAllDailyExpensesQuery();

    const {data: incomesMonthly} = useGetAllMonthlyIncomesQuery();
    const {data: expenseMonthly} = useGetAllMonthlyExpensesQuery();

    const [createExpense] = useCreateExpenseMutation();
    if (!incomesDaily || !expensesDaily || !incomesMonthly || !expenseMonthly) {
        return (<div>Loading</div>)
    }

    const incomes = Object.values(incomesDaily);
    const expenses = Object.values(expensesDaily);
    const dates = Object.keys(expensesDaily).concat(Object.keys(incomesDaily));

    const monthlyIncomes = Object.values(incomesMonthly);
    const monthlyExpenses = Object.values(expenseMonthly).map(v => -v);
    const months = Object.keys(incomesMonthly);

    const handleFormStateChange = (property) => (e) => {
        const value = e.target.value;
        setFormState(prevState => ({...prevState, [property]: value }));
    }
    const handleCreateExpense = () => {
        createExpense({...formState, sum: +formState.sum});
    }
    return (
        <div className="stats-page-content">
            <h1 style={{textAlign: 'center', paddingBottom: '20px', margin: 0}}>Statistic</h1>
            <div className="grid-container">
                <div>
                    <h2 style={{textAlign: 'center', paddingBottom: '20px', margin: 0}}>Daily</h2>
                </div>
                <div>
                    <h2 style={{textAlign: 'center', paddingBottom: '20px', margin: 0}}>Monthly</h2>
                </div>
                <div className="block1">
                    <div className={'my-chart'}>
                        <LineChart
                            height={300}
                            series={[
                                {data: incomes, label: 'Incomes', yAxisKey: 'leftAxisId', color: "#478031"},
                                {data: expenses, label: 'Expenses', yAxisKey: 'leftAxisId', color: "#ab022d"},
                            ]}
                            xAxis={[{scaleType: 'point', data: dates}]}
                            yAxis={[{id: 'leftAxisId'}]}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0px'}}>
                        <h2>Add Expense</h2>

                        <div className="select-container">
                            <select
                                value={formState.category}
                                onChange={handleFormStateChange('category')}
                                style={{marginRight: '10px', backgroundColor: 'black', color: 'white'}}>
                                {expenseCategories && expenseCategories.map(category => (
                                    <option value={category}>{category}</option>
                                ))}
                            </select>
                            <input
                                style={{backgroundColor: 'black', color: 'white'}}
                                value={formState.sum}
                                onChange={handleFormStateChange('sum')}
                                className="number-input" type="number"/>
                            <span className="currency"> UAH</span>
                        </div>


                        <button
                            onClick={handleCreateExpense}
                            style={{
                            margin: '10px',
                            backgroundColor: 'black',
                            border: '1px solid white',
                            borderRadius: '10px'
                        }} className="button">Save
                        </button>
                    </div>
                </div>
                <div style={{backgroundColor: 'white'}} className="block2">
                    <BarChart
                        height={500}
                        series={[
                            {data: monthlyIncomes, label: 'Income', id: 'uvId', stack: 'stack1', color: '#478031'},
                            {data: monthlyExpenses, label: 'Expenses', id: 'pvId', stack: 'stack1', color: '#ab022d'},
                        ]}
                        xAxis={[{data: months, scaleType: 'band', tickLabelStyle: { fontSize: '8px'}}]}
                    />
                </div>
            </div>
        </div>
    );
};
