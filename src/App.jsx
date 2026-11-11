import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import "./App.css";

function App() {

    // Read previously saved transactions
    const [transactions, setTransactions] = useState(() => {
        const savedData = localStorage.getItem("transactions");

        return savedData ? JSON.parse(savedData) : [
            { id: 1, title: "Breakfast", category: "Food", amount: 50 },
            { id: 2, title: "Lunch", category: "Food", amount: 100 }
        ];
    });

    const [editingTransaction, setEditingTransaction] = useState(null);

    // Save whenever transactions change
    useEffect(() => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
    }, [transactions]);

    // CREATE and UPDATE
    const handleAdd = (payload) => {

        if (editingTransaction) {

            setTransactions((prev) =>
                prev.map((item) =>
                    item.id === payload.id ? payload : item
                )
            );

            setEditingTransaction(null);

        } else {

            setTransactions((prev) => [
                ...prev,
                payload
            ]);

        }
    };

    // EDIT
    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
    };

    // DELETE
    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (confirmDelete) {
            setTransactions((prev) =>
                prev.filter((item) => item.id !== id)
            );

            if (editingTransaction?.id === id) {
                setEditingTransaction(null);
            }
        }
    };

    return (
        <div className="container">

            <h1>Transactions Management</h1>

            <TransactionForm
                onSave={handleAdd}
                editingTransaction={editingTransaction}
                onCancel={() => setEditingTransaction(null)}
            />

            <h2>Transaction History</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>

                            <td>{transaction.id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.category}</td>
                            <td>₹{transaction.amount}</td>

                            <td>
                                <button
                                    onClick={() => handleEdit(transaction)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>
                Total Amount: ₹
                {transactions.reduce(
                    (total, item) => total + item.amount, 0
                )}
            </h3>

        </div>
    );
}

export default App;