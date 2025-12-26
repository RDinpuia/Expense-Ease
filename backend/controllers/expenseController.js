const Expense = require("../models/Expense");

// GET all expenses
const getExpenses = async (req, res) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });
  res.json(expenses);
};

// POST new expense
const addExpense = async (req, res) => {
  const { title, amount, date } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const expense = await Expense.create({
    title,
    amount,
    date,
  });

  res.status(201).json(expense);
};

// GET total expense
const getTotalExpense = async (req, res) => {
  const expenses = await Expense.find();
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  res.json({ total });
};

// DELETE expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const deletedExpense = await Expense.findByIdAndDelete(id);

  if (!deletedExpense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  res.json({ message: "Expense deleted successfully" });
};

// UPDATE expense
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    id,
    { title, amount, date },
    { new: true }
  );

  if (!updatedExpense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  res.json(updatedExpense);
};

module.exports = {
  getExpenses,
  addExpense,
  getTotalExpense,
  deleteExpense,
  updateExpense,
};
