import { useState, useEffect } from "react";

function TransactionForm({ onSave, editingTransaction, onCancel }) {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Food");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.title);
            setCategory(editingTransaction.category);
            setAmount(editingTransaction.amount);
        } else {
            setTitle("");
            setCategory("Food");
            setAmount("");
        }
    }, [editingTransaction]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || amount === "" || Number(amount) <= 0) {
            alert("Please enter valid transaction details");
            return;
        }

        const payload = {
            id: editingTransaction
                ? editingTransaction.id
                : Date.now(),
            title,
            category,
            amount: Number(amount)
        };

        onSave(payload);

        setTitle("");
        setCategory("Food");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">

            <h2>
                {editingTransaction
                    ? "Edit Transaction"
                    : "Add Transaction"}
            </h2>

            <input
                type="text"
                placeholder="Transaction Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
            </select>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button type="submit">
                {editingTransaction ? "Update" : "Add Transaction"}
            </button>

            {editingTransaction && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}

        </form>
    );
}

export default TransactionForm;