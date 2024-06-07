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
import Following from "./pages/Following";
import Follower from "./pages/Follower";
import FundingComplete from "./pages/FundingComplete";
import Settings from "./pages/Settings";
import ProjectExplain from "./pages/ProjectExplain";
import FundingProgress from "./pages/FundingProgress";
import CommuPostWrite from "./components/write/CommuPostWrite";
import AnnouncePostWrite from "./components/write/AnnouncePostWrite";
import ReviewWrite from "./components/write/ReviewWrite";
import { CheckoutPage } from "./components/toss/Checkout";
import { SuccessPage } from "./components/toss/Success";
import { FailPage } from "./components/toss/Fail";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  const auth = useProvideAuth();

  return (
    <SignInContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/profile/following" element={<Following />} />
          <Route path="/profile/follower" element={<Follower />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/success" element={<FundingComplete />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projectdetail" element={<ProjectExplain />} />
          <Route
            path="/projectdetail/announcements/write/:id"
            element={<AnnouncePostWrite />}
          />
          <Route
            path="/projectdetail/communities/write/:id"
            element={<CommuPostWrite />}
          />
          <Route 
            path="/projectdetail/reviews/write/:id" 
            element={<ReviewWrite />} />
          <Route path="/funding" element={<FundingProgress />} />
          <Route path="/funding/checkout" element={<CheckoutPage />} />
          <Route path="/funding/success" element={<SuccessPage />} />
          <Route path="/funding/fail" element={<FailPage />} />
        </Routes>
      </Layout>
    </SignInContext.Provider>
  );
}

export default App;
