// src/components/AddExpenseForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expenseSlice";
import { v4 as uuidv4 } from "uuid";

const AddExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const dispatch = useDispatch();

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      id: uuidv4(),
      amount,
      category,
      date,
      description,
    };

    dispatch(addExpense(newExpense));

    setAmount(0);
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleAddExpense}>
      <div className="secondary__container">
        {" "}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="secondary__container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
