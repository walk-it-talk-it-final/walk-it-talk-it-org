import { BrowserRouter, useLocation } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";


const Layout = ({ children }) => {
  // 헤더를 숨길 페이지 경로 모음
  const location = useLocation();
  const hideHeaderPaths = ["/signup"];
  const hideFooterPaths = ["/"];


  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header /> }
      <Main>{children}</Main>
      {!hideFooterPaths.includes(location.pathname) && <Footer /> }
    </>
  );
};

export default Layout;
