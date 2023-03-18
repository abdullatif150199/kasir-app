import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Keranjang from "./pages/Keranjang";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (result) => {
      if (result) {
        setIsLogin(true);
        return;
      }
      setIsLogin(false);
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        {isLogin ? (
          <>
            <NavbarComponent />
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/sukses" element={<Sukses />} />
              <Route path="/keranjang" element={<Keranjang />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
