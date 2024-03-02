import React, { useState } from "react";
import { useLoginMutation } from "../../slices/auth/authApiSlice";
import { useDispatch } from "react-redux";

import { setCredentials } from "../../slices/auth/authSlice";

const Login = () => {
  //misc
  const dispatch = useDispatch();

  const [login, { isLoading: isLoadingLogin, isError: isErrorLogin }] =
    useLoginMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, email, password } = formData;
      const payload = await login({ username, email, password }).unwrap();
      dispatch(setCredentials(payload.data));
      console.log("Login successful", payload);
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoadingLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
