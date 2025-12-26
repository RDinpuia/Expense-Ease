import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Fetch expenses + total on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesRes = await axios.get(
          `${API_URL}/api/expenses`
        );
        setExpenses(expensesRes.data);

        const totalRes = await axios.get(
          `${API_URL}/api/expenses/total`
        );
        setTotal(totalRes.data.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // ADD or UPDATE expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      title,
      amount: Number(amount),
      date,
    };

    try {
      if (editId) {
        // UPDATE expense
        const res = await axios.put(
          `${API_URL}/api/expenses/${editId}`,
          expenseData
        );

        setExpenses((prev) =>
          prev.map((exp) =>
            exp._id === editId ? res.data : exp
          )
        );

        setEditId(null);
      } else {
        // ADD expense
        const res = await axios.post(
          `${API_URL}/api/expenses`,
          expenseData
        );

        setExpenses((prev) => [...prev, res.data]);
      }

      // Refresh total
      const totalRes = await axios.get(
        `${API_URL}/api/expenses/total`
      );
      setTotal(totalRes.data.total);
    } catch (error) {
      console.error(error);
    }

    setTitle("");
    setAmount("");
    setDate("");
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/expenses/${id}`
      );

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );

      const totalRes = await axios.get(
        `${API_URL}/api/expenses/total`
      );
      setTotal(totalRes.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  // Load expense into form for editing
  const handleEdit = (expense) => {
    setEditId(expense._id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date);
  };

  return (
    <div className="app">
      <h1>Simple Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <h3>All Expenses</h3>

      {safeExpenses.length === 0 && (
        <p>No expenses added yet.</p>
      )}

      {safeExpenses.map((exp) => (
        <div
          key={exp._id}
          style={{ marginBottom: "8px" }}
        >
          <strong>{exp.title}</strong> | ₹{exp.amount} |{" "}
          {exp.date}
          <button
            onClick={() => handleEdit(exp)}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(exp._id)}
            style={{ marginLeft: "6px" }}
          >
            Delete
          </button>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
    </div>
  );
}

export default App;
