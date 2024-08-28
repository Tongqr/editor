import React from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import Editor from "../pages/editor/index";
import Test from "../pages/test";
const routerConfig: RouteObject[] = [
  // {
  //   path: "/",
  //   element: <Navigate to="home" replace={true} />,
  // },
  {
    path: "/",
    id: "root",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "editor", element: <Editor /> },
      { path: "test", element: <Test /> },
    ],
  },
];
// export const routes = createBrowserRouter(routerConfig);
export { routerConfig as routers };
