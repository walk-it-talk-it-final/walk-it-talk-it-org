import React from "react";
import Layout from "./components/layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { LoginContext } from "./contexts/LoginContext";
import { useProvideAuth } from "./hooks/useProvideAuth";
import AddMaker from "./pages/AddMaker";
import AddProject from "./pages/AddProject";
import Search from "./pages/Search";
import Home from "./pages/Home";

function App() {
  const auth = useProvideAuth();

  return (
    <LoginContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addmaker" element={<AddMaker />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/Home" element={<Home />} /> 
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
