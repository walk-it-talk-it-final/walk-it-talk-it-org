import React from "react";
import "./App.css";
import Layout from "./components/layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SingIn";
import { SignInContext } from "./contexts/SignInContext";
import { useProvideAuth } from "./hooks/useProvideAuth";
import Chat from "./pages/Chat";

import SearchList from "./pages/SearchList";
import AddMaker from "./pages/AddMaker";
import AddProject from "./pages/AddProject";
import Search from "./pages/SearchList";
import Home from "./pages/Home";

function App() {
  const auth = useProvideAuth();

  return (
    <SignInContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addmaker" element={<AddMaker />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/searchlist" element={<SearchList />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </SignInContext.Provider>
  );
}

export default App;
