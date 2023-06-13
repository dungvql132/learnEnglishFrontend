import React from "react";
import LoginPage from "../pages/login.page";
import RegisterPage from "../pages/register.page";

const routers = [
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
];

export default { routers };
