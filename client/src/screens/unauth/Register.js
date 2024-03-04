import React, { useState } from "react";
import { useRegisterUserMutation } from "../../slices/auth/authApiSlice";
import { setCredentials } from "../../slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //misc
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //queries n mutation
  const [registerUser] = useRegisterUserMutation();

  //func
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser({ username, email, password }).unwrap();
      dispatch(setCredentials(result.data));
      console.log(result, "Registration successful");
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p onClick={() => handleRedirectToLogin()}>
          Already registered, Please Login.
        </p>
      </form>
    </div>
  );
};

export default Register;
