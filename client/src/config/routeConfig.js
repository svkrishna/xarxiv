import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
//unauth
import LoginScreen from "../screens/unauth/Login";
import RegisterScreen from "../screens/unauth/Register";
//auth
import HomeScreen from "../screens/auth/Home";
import AddPaperScreen from "../screens/auth/AddPaper";
import MyPapersScreen from "../screens/auth/MyPapers";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
      </Route>
      {/* private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/addPaper" element={<AddPaperScreen />} />
        <Route path="/myPapers" element={<MyPapersScreen />} />
      </Route>
      <Route path="*" element={<h1>404 Component</h1>} />
    </Route>
  )
);
