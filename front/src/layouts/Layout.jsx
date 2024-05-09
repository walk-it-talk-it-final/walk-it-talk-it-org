import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

export default Layout;
