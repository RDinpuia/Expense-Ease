# Expense Spitter

A simple expense tracker application with a React frontend and Express.js backend.

## Features

- ➕ Add new expenses with title, amount, and date
- ✏️ Edit existing expenses
- 🗑️ Delete expenses
- 💰 View total expense amount
- 🔄 Real-time updates

## Tech Stack

**Frontend:**

- React 19
- Vite
- Axios
- ESLint

**Backend:**

- Node.js
- Express.js
- CORS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Expense-Spitter
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your configuration:
   ```
   PORT=5000
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

**Terminal 1 - Start Backend Server:**

```bash
cd backend
npm start
```

Backend runs on `http://localhost:5000`

**Terminal 2 - Start Frontend Dev Server:**

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### GET `/api/expenses`

Get all expenses

### POST `/api/expenses`

Add a new expense

- Body: `{ title, amount, date }`

### PUT `/api/expenses/:id`

Update an expense

- Body: `{ title, amount, date }`

### DELETE `/api/expenses/:id`

Delete an expense

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   └── expenseController.js
│   ├── routes/
│   │   └── expenses.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── .gitignore
├── .env.example
└── README.md
```

## Development Notes

- Backend uses in-memory storage (not persistent)
- CORS is enabled for frontend-backend communication
- Frontend uses environment variable `VITE_API_URL` for API base URL

## Future Enhancements

- Add database (MongoDB/PostgreSQL)
- User authentication
- Expense categories
- Monthly/weekly reports
- Data persistence
