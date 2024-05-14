import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Layout from "./layouts/Layout";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AddMaker from './pages/AddMaker';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AddMaker" element={<AddMaker />}/>
      </Routes>
    </Layout>
  );
}

export default App;
