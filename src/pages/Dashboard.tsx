import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="form__container">
        <h2
          style={{
            margin: "2.5rem 0 0 0",
          }}
        >
          Dashboard
        </h2>
        <div>
          <AddExpenseForm />
          <ExpenseList />
        </div>
      </div>
      <button className="btn__logout" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
