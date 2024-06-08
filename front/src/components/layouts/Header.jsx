import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const theme = useTheme(); // 테마 접근
  const mainColor = theme.palette.mainColor.main; // mainColor 가져오기

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // 각 페이지로 이동하는 함수
  const goToSearch = () => navigate("/search");

  // 채팅 페이지 이동 시 사용자 로그인 검사
  const handleChatCllick = () => {
    if (!loginUser) {
      navigate("/signin");
    } else {
      navigate("/chat");
    }
  };

  // 프로필 페이지 이동 시 사용자 로그인 검사
  const handleProfileClick = () => {
    if (!loginUser) {
      navigate("/signin");
    } else {
      navigate("/profile");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          {/* 로고 이미지 완성되면 이미지 대체 */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#000" }}
          >
            LOGO
          </Typography>
          {/* 검색 */}
          {/* 검색 페이지 만들어지면 url 연결 */}
          <SearchIcon
            sx={{
              color: mainColor,
              cursor: "pointer",
            }}
            onClick={goToSearch}
          />
          {/* 채팅방 */}
          {/* 채팅방 페이지 만들어지면 url 연결 */}
          <ModeCommentOutlinedIcon
            sx={{
              color: mainColor,
              marginLeft: "16px",
              cursor: "pointer",
            }}
            onClick={handleChatCllick}
          />
          {/* 프로필 */}
          {/* 프로필 페이지 만들어지면 url 연결 */}
          <AccountCircleOutlinedIcon
            sx={{
              color: mainColor,
              marginLeft: "16px",
              cursor: "pointer",
            }}
            onClick={handleProfileClick}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
