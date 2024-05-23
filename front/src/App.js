import React from "react";
import Layout from "./components/layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { LoginContext } from "./contexts/LoginContext";
import { useProvideAuth } from "./hooks/useProvideAuth";
import AddMaker from "./pages/AddMaker";
import AddProject from "./pages/AddProject";
// import Search from "./pages/Search";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyFunding from "./pages/MyFunding";
import LikeProject from "./pages/LikeProject";
import MyProject from "./pages/MyProject";
import SponsorList from "./pages/SponsorList";
import Following from "./pages/Following";
import Follower from './pages/Follower';

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
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/myfunding" element={<MyFunding />} />
          <Route path="/profile/likeproject" element={<LikeProject />} />
          <Route path="/profile/myproject" element={<MyProject />} />
          <Route path="/sponsors" element={<SponsorList />} />
          <Route path="/profile/following" element={<Following />} />
          <Route path="/profile/follower" element={<Follower />} />
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
