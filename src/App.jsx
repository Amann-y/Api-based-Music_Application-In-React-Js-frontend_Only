import React from "react";
import Home from "./pages/Home";
import Album from "./pages/Album";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";



const App = () => {
  return (
    <div className="main_app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:id" element={<Album />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
