import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <BrowserRouter>
      <Header />
      <Main>{children}</Main>
    </BrowserRouter>
  );
};

export default Layout;
