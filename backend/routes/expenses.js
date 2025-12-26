const express = require("express");
const router = express.Router();

const {
  getExpenses,
  addExpense,
  getTotalExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

// GET /api/expenses
router.get("/", getExpenses);

// POST /api/expenses
router.post("/", addExpense);

// GET /api/expenses/total
router.get("/total", getTotalExpense);

// DELETE /api/expenses/:id
router.delete("/:id", deleteExpense);

// UPDATE /api/expenses/:id
router.put("/:id", updateExpense);

module.exports = router;
