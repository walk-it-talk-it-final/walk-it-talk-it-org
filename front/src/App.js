import React from "react";
import Layout from "./components/layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { LoginContext } from "./contexts/LoginContext";
import { useProvideAuth } from "./hooks/useProvideAuth";
import AddMaker from "./pages/AddMaker";
import AddProject from "./pages/AddProject";
import SearchList from "./pages/SearchList";

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
          <Route path="/SearchList" element={<SearchList />} />
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
