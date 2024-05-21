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
import Search from "./pages/Search";

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
          <Route path="/searchlist" element={<SearchList />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
