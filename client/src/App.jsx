import React from "react";
import Home from "./component/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full h-full ">
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;