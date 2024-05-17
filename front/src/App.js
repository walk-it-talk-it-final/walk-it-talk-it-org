import React from "react";
import Layout from "./components/layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { LoginContext } from "./contexts/LoginContext";
import { useProvideAuth } from "./hooks/useProvideAuth";

function App() {
  const auth = useProvideAuth();
  return (
    <LoginContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/AddMaker" element={<AddMaker />} />
          <Route path="/AddProject" element={<AddProject />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
