import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Typography, IconButton, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardList from "./layouts/CardList";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/services/user";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { ClassSharp } from "@mui/icons-material";
import introIMG from "../assets/intro.png";

export const MyProfile = ({ user }) => {
  const token = localStorage.getItem("token");
  const { loginUser } = useAuth();

  // 팔로워 수
  const [followerNum, setFollowerNum] = useState(0);
  const [followingNum, setFollowingNum] = useState(0);

  const [followerList, setFollowerList] = useState();
  const [followingList, setFollowingList] = useState();

  // 후원한 프로젝트 개수
  const [ingProjectCount, setIngProjectCount] = useState(0);

  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const navigate = useNavigate();

  // 팔로워하는 유저 불러오기
  const getFollowerList = async () => {
    const id = user.id;
    const res = await userApi.getFollowers(id);
    setFollowerList(res.payload);
    setFollowerNum(res.payload.length);
  };

  // 팔로잉하는 유저 불러오기
  const getFollowingList = async () => {
    const id = user.id;
    const res = await userApi.getFollowings(id);
    setFollowingList(res.payload);
    setFollowingNum(res.payload.length);
  };

  const getIngProject = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/ingprojects/${loginUser.id}`,
        {
          headers: { Authorization: token },
        },
      );

      if (res.data.payload) {
        setIngProjectCount(res.data.payload.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFollowingList();
    getFollowerList();
    getIngProject();
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const { logout } = useAuth();
  const handleLogout = () => {
    logout(() => {
      Toast.fire({
        icon: "success",
        title: "정상적으로 로그아웃 되었습니다.",
      });
      navigate("/");
    });
  };

  // 각 페이지로 이동하는 함수
  const goTofundingProjectList = () => navigate("/profile/myfunding");
  const goToFollowingList = () =>
    navigate("/profile/following", { state: { followingList } });
  const goToFollowerList = () =>
    navigate("/profile/follower", { state: { followerList } });
  const goToMyProject = () => navigate("/profile/myproject");
  const goToAddProject = () => navigate("/addmaker");
  const goToLikeProject = () => navigate("/profile/likeproject");
  const goToMySettings = () => navigate("/profile/settings");

  // 카드 리스트에 담을 임시 데이터
  const projects = [
    {
      id: 1,
      title:
        "펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목",
      creator: "프로젝트 생성자 1",
      progress: "33% 달성",
      amount: "5만원 +",
      remainingDays: "8일 남음",
      image: "https://via.placeholder.com/130",
    },
    {
      id: 2,
      title:
        "펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 ",
      creator: "프로젝트 생성자 2",
      progress: "33% 달성",
      amount: "5만원 +",
      remainingDays: "8일 남음",
      image: "https://via.placeholder.com/130",
    },
    {
      id: 3,
      title: "펀딩 프로젝트 333 입니다 ",
      creator: "프로젝트 생성자 3",
      progress: "153% 달성",
      amount: "17만원 +",
      remainingDays: "15일 남음",
      image: "https://via.placeholder.com/130",
    },
  ];

  return (
    <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="form"
        p={2}
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50ch",
          gap: "30px",
        }}
      >
        <div
          className="profileWrap"
          style={{ marginTop: "70px", display: "block", height: "auto" }}
        >
          {/* 프로필 이미지 및 이름, 프로필 설정 div */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Avatar
                alt="프로필 이미지"
                src={`http://localhost:8000/${user.profileImage}`}
                sx={{ width: 70, height: 70, border: "1px solid grey" }}
              />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold" }}
                id="profileName"
              >
                {user.nickname}
              </Typography>

              <Button
                variant="outlined"
                color="mainColor"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </div>
          </div>

          {/* 후원한 프로젝트. 팔로잉, 팔로워 wrap div */}
          <div
            className="numberWrap"
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingRight: 10,
            }}
          >
            <div style={{ textAlign: "center" }}>
              {" "}
              {/* 각각 숫자랑 글씨 레이아웃용 div */}
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: mainColor,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                id="myFundingNum"
                onClick={goTofundingProjectList}
              >
                {ingProjectCount}
              </Typography>{" "}
              {/* 펀딩한 프로젝트 수 */}
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                후원한 프로젝트
              </Typography>
            </div>

            <div style={{ textAlign: "center" }}>
              {" "}
              {/* 각각 숫자랑 글씨 레이아웃용 div */}
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: mainColor,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                id="following"
                onClick={goToFollowingList}
                num={followingNum}
              >
                {followingNum}
              </Typography>{" "}
              {/* 팔로잉 수 */}
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                팔로잉
              </Typography>
            </div>

            <div style={{ textAlign: "center" }}>
              {" "}
              {/* 각각 숫자랑 글씨 레이아웃용 div */}
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: mainColor,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                id="follower"
                onClick={goToFollowerList}
                num={followerNum}
              >
                {followerNum}
              </Typography>{" "}
              {/* 팔로워 수 */}
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                팔로워
              </Typography>
            </div>
          </div>

          {/* 각 해당 페이지 버튼 영역 wrap */}
          <div
            className="buttonWrap"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 30,
              borderTop: "0.5px solid lightgrey",
            }}
          >
            <div style={{ textAlign: "center", marginTop: 30 }}>
              {" "}
              {/* 버튼, 기능 텍스트 묶음용 div */}
              <IconButton
                sx={{
                  color: mainColor,
                  width: 80,
                  height: 80,
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                  backgroundColor: "#FBF6F4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={goToMyProject}
              >
                <PersonIcon sx={{ width: 40, height: 40 }} />
              </IconButton>
              <Typography sx={{ marginTop: 1 }}>내 프로젝트</Typography>
            </div>

            <div style={{ textAlign: "center", marginTop: 30 }}>
              {" "}
              {/* 버튼, 기능 텍스트 묶음용 div */}
              <IconButton
                sx={{
                  color: mainColor,
                  width: 80,
                  height: 80,
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                  backgroundColor: "#FBF6F4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={goToAddProject}
              >
                <AddIcon sx={{ width: 40, height: 40 }} />
              </IconButton>
              <Typography sx={{ marginTop: 1 }}>새 프로젝트</Typography>
            </div>

            <div style={{ textAlign: "center", marginTop: 30 }}>
              {" "}
              {/* 버튼, 기능 텍스트 묶음용 div */}
              <IconButton
                sx={{
                  color: mainColor,
                  width: 80,
                  height: 80,
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                  backgroundColor: "#FBF6F4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={goToLikeProject}
              >
                <FavoriteIcon sx={{ width: 40, height: 40 }} />
              </IconButton>
              <Typography sx={{ marginTop: 1 }}>찜한 프로젝트</Typography>
            </div>

            <div style={{ textAlign: "center", marginTop: 30 }}>
              {" "}
              {/* 버튼, 기능 텍스트 묶음용 div */}
              <IconButton
                sx={{
                  color: mainColor,
                  width: 80,
                  height: 80,
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                  backgroundColor: "#FBF6F4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={goToMySettings}
              >
                <SettingsIcon sx={{ width: 40, height: 40 }} />
              </IconButton>
              <Typography sx={{ marginTop: 1 }}>프로필 수정</Typography>
            </div>
          </div>
          <div className="recentView" style={{ marginTop: 50, padding: 10}}>
            <img src={introIMG} style={{width: "100%"}}></img>
          </div>
        </div>
      </Box>
    </div>
  );
};
