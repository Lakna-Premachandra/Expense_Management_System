import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteExpense, editExpense } from "../store/expenseSlice";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const ExpenseList: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedExpense, setEditedExpense] = useState({
    id: "",
    amount: 0,
    category: "",
    date: "",
    description: "",
  });

  const colors = [
    "#f8d7da",
    "#d1ecf1",
    "#fff3cd",
    "#d4edda",
    "#f8d7f2",
    "#e2e3e5",
    "#ffeeba",
  ];

  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (expense: any) => {
    setIsEditing(expense.id);
    setEditedExpense(expense);
  };

  const handleSave = () => {
    dispatch(editExpense(editedExpense));
    setIsEditing(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedExpense({ ...editedExpense, [field]: e.target.value });
  };

  return (
    <div className="main__list__container">
      {expenses.map((expense, index) => (
        <div
          className="list__container"
          style={{
            backgroundColor: colors[index % colors.length],
          }}
          key={expense.id}
        >
          <h3> Expence Item for {expense.date} </h3>
          {isEditing === expense.id ? (
            <div className="edit__container">
              <input
                type="number"
                value={editedExpense.amount}
                onChange={(e) => handleChange(e, "amount")}
              />
              <input
                type="text"
                value={editedExpense.category}
                onChange={(e) => handleChange(e, "category")}
              />
              <input
                type="date"
                value={editedExpense.date}
                onChange={(e) => handleChange(e, "date")}
              />
              <input
                type="text"
                value={editedExpense.description}
                onChange={(e) => handleChange(e, "description")}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="list__items">
              <p>Amount: {`Rs. ${expense.amount}`}</p>
              <p>Category: {expense.category}</p>
              <p>Date: {expense.date}</p>
              <p>Description: {expense.description}</p>
              <div className="btn__groups">
                <button id="edit__btn" onClick={() => handleEdit(expense)}>
                  <FaEdit />
                </button>
                <button
                  id="delete__btn"
                  onClick={() => handleDelete(expense.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
