import React from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import Editor from "../pages/editor/index";
import Test from "../pages/test";
import TestUseEffect from "../pages/useeffect/index";
import Board from "../pages/board/board";
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
      { path: "testUseEffect", element: <TestUseEffect /> },
      { path: "board", element: <Board /> },
    ],
  },
];
// export const routes = createBrowserRouter(routerConfig);
export { routerConfig as routers };
