import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../store/authSlice";
import "../styles/Form/index.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const { email: storedEmail, password: storedPassword } =
          JSON.parse(storedUser);

        if (
          storedEmail === values.email &&
          storedPassword === values.password
        ) {
          dispatch(login());
          navigate("/dashboard");
        } else {
          formik.setErrors({ email: "Invalid email or password" });
        }
      } else {
        formik.setErrors({ email: "No user found. Please register first." });
      }
    },
  });

  return (
    <div className="form__container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.email && formik.errors.email ? "error" : ""}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.password && formik.errors.password ? "error" : ""
          }
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
