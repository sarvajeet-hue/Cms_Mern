import React from "react";
import Home from "./components/Home";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/adminHeader" element={<AdminHeader />} />
      </Routes>
    </div>
  );
}

export default App;
