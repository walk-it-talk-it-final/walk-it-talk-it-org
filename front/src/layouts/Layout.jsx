import { BrowserRouter, useLocation } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";

const Layout = ({ children }) => {
  // 헤더를 숨길 페이지 경로 모음
  const location = useLocation();
  const hideHeaderPaths = ["/signup"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
