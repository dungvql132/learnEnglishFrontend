import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthRouter from "@src/module/authentication/routers";
import WebsiteRouter from "@src/module/website/routers";
import ChatBox from "./module/chat/compoments/chatBox";

const routers = [
  ...AuthRouter.routers,
  ...WebsiteRouter.routers,
  {
    path: "/chat",
    element: <ChatBox></ChatBox>,
  },
];

const router = createBrowserRouter(routers);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
