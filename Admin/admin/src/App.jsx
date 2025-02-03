import React from "react";
import axios from "axios";
import Home from "./components/Home";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </div>
  );
}

export default App;
