import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./layouts/Layout";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Layout>
  );
}

export default App;
