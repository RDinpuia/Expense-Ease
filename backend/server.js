import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
let expenses = [];

// GET
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// POST - create
app.post("/api/expenses", (req, res) => {
  const newExpense = {
    id: Date.now(), // number id
    ...req.body,
  };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// PUT - update
app.put("/api/expenses/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expenses[index] = {
    ...expenses[index],
    ...req.body,
  };

  res.json(expenses[index]);
});

// DELETE
app.delete("/api/expenses/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expenses.splice(index, 1); // remove item
  res.json({ message: "Deleted" });
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
