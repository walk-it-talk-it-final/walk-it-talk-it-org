import React from "react";
import "./App.css";
import Layout from "./components/layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { SignInContext } from "./contexts/SignInContext";
import { useProvideAuth } from "./hooks/useProvideAuth";
import Chat from "./pages/Chat";

import SearchList from "./pages/SearchList";
import AddMaker from "./pages/AddMaker";
import AddProject from "./pages/AddProject";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyFunding from "./pages/MyFunding";
import LikeProject from "./pages/LikeProject";
import MyProject from "./pages/MyProject";
import SponsorList from "./pages/SponsorList";
import FundingComplete from "./pages/FundingComplete";

function App() {
  const auth = useProvideAuth();

  return (
    <SignInContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addmaker" element={<AddMaker />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/myfunding" element={<MyFunding />} />
          <Route path="/profile/likeproject" element={<LikeProject />} />
          <Route path="/profile/myproject" element={<MyProject />} />
          <Route path="/sponsors" element={<SponsorList />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/success" element={<FundingComplete />} />
        </Routes>
      </Layout>
    </SignInContext.Provider>
  );
}

export default App;
