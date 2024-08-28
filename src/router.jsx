import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/ide" element={<IDE />} /> */}
    </Routes>
  );
}

export default Router;
