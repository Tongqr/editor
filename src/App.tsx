import "./App.css";
import * as React from "react";
// import RootRouter from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers/index";
import { useRoutes } from "react-router-dom";
function App() {
  return (
    // <BrowserRouter>
    //   <RootRouter />
    // </BrowserRouter>
    // <RouterProvider router={routes} />
    useRoutes(routers)
  );
}

export default App;
