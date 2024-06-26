import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  useTheme,
  IconButton,
  Avatar,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Element, scroller } from "react-scroll";
import Sticky from "react-stickynode";
import Reviews from "./Reviews.jsx";
import Announcements from "./Announcements.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Community from "./Community.jsx";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.jsx";
import { projectApi } from "../api/services/project.js";
import { userApi } from "../api/services/user.js";

//프로젝트 이미지
const ProjectImage = ({ content }) => {
  if (!content) {
    return <div>No image available</div>;
  }

  const imgUrl = `http://localhost:8000/${content}`;

  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 4,
      }}
    >
      <img
        src={imgUrl}
        alt="Project Thumbnail"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Box>
  );
};

//프로젝트 제목
const ProjectTitle = ({ title }) => (
  <Typography variant="h1" sx={{ fontSize: "24px", mb: 2 }}>
    <b>{title}</b>
  </Typography>
);

//프로젝트 참여율 및 달성률
const ProjectStats = ({
  id,
  participants,
  goalAmount,
  mainColor,
  subColor4,
  remainingDays,
  achievementRate,
  maker,
}) => {
  const loginUserId = localStorage.getItem("userId");
  const handleDelete = async () => {
    await projectApi.deleteProject(id);
  };

  return (
    <Box
      sx={{
        display: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        mr: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ color: mainColor }}>
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            {participants}
          </span>
          명 참여
        </Typography>
        <Box sx={{ backgroundColor: "#FFDED1", borderRadius: 1, px: 1 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: "bold", fontSize: "15px", color: mainColor }}
          >
            {remainingDays}일 남음
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            {goalAmount}
          </span>
          원 달성
        </Typography>
        <Box sx={{ backgroundColor: "#E8e8e8", borderRadius: 1, px: 1 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: "bold", fontSize: "15px", color: subColor4 }}
          >
            {achievementRate}% 달성
          </Typography>
        </Box>
      </Box>
      {maker == loginUserId && (
        <Box>
          <Button
            variant={"contained"}
            sx={{
              backgroundColor: mainColor,
              color: "white",
              fontWeight: "bold",
              ml: "auto",
              borderColor: mainColor,
              ":hover": {
                backgroundColor: mainColor,
                color: "white",
                borderColor: mainColor,
              },
            }}
            onClick={() => handleDelete()}
          >
            삭제
          </Button>
        </Box>
      )}
    </Box>
  );
};

//프로젝트 좋아요 수
const ProjectActions = ({ likes, subColor4, handleLike, liked }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <IconButton onClick={handleLike}>
        {liked ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: subColor4 }} />
        )}
      </IconButton>
      <Typography>{likes}</Typography>
    </Box>
  </Box>
);

// 프로젝트 상단 모음
const ProjectHeader = ({
  id,
  title,
  participants,
  mainColor,
  goalAmount,
  likes,
  shares,
  handleLike,
  subColor4,
  liked,
  remainingDays,
  isLiked,
  achievementRate,
  maker,
}) => (
  <Box sx={{ textAlign: "left", mb: 4 }}>
    <ProjectTitle title={title} />
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
      }}
    >
      <ProjectStats
        id={id}
        participants={participants}
        goalAmount={goalAmount}
        mainColor={mainColor}
        subColor4={subColor4}
        remainingDays={remainingDays}
        achievementRate={achievementRate}
        maker={maker}
      />
      <ProjectActions
        likes={likes}
        shares={shares}
        subColor4={subColor4}
        handleLike={handleLike}
        isLiked={isLiked}
      />
    </Box>
  </Box>
);

// 프로젝트 제작자
const UserProfile = ({ user, satisfaction, reviewCount, mainColor }) => {
  const { loginUser } = useAuth();
  const [myFollowing, setMyFollowing] = useState();
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    getFollowings();
    getFollwerNum();
  }, []);

  // 사용자가 팔로우하는 사람들 조회
  const getFollowings = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/followings/${loginUser?.id}`,
      {},
    );
    setMyFollowing(res.data.payload);
  }, [loginUser]);

  // 프로젝트 관리자를 팔로우하는 사람들 조회
  const getFollwerNum = async () => {
    const id = user.id;
    const res = await userApi.getFollowers(id);
    setFollowers(res.payload.length);
  };

  // 프로젝트 관리자 팔로우
  const followUser = async (id) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/follow`,
      {
        id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
    if (res.data.code === 200) {
      alert(res.data.message);
      getFollowings();
    }
  };

  // 프로젝트 관리자 언팔로우
  const unfollowUser = async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users/follow`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          id,
        },
      },
    );
    if (res.data.code === 200) {
      alert(res.data.message);
      getFollowings();
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        p: 2,
        mb: 4,
        borderRadius: "10px",
        mx: "auto",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Avatar
          alt="User"
          src={`http://localhost:8000/${user.profileImage}`}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {user.nickname}
          </Typography>
          <Typography sx={{ color: mainColor, mb: 1, fontSize: "14px" }}>
            {followers}명이 팔로우 중
          </Typography>
        </Box>
        <Button
          variant={
            myFollowing?.findIndex((f) => f.id === user.id) !== -1
              ? "outlined"
              : "contained"
          }
          onClick={
            myFollowing?.findIndex((f) => f.id === user.id) !== -1
              ? () => unfollowUser(user.id)
              : () => followUser(user.id)
          }
          sx={{
            backgroundColor:
              myFollowing?.findIndex((f) => f.id === user.id) !== -1
                ? "white"
                : mainColor,
            color:
              myFollowing?.findIndex((f) => f.id === user.id) !== -1
                ? mainColor
                : "white",
            fontWeight: "bold",
            ml: "auto",
            borderColor: mainColor,
            ":hover": {
              backgroundColor:
                myFollowing?.findIndex((f) => f.id === user.id) !== -1
                  ? "white"
                  : mainColor,
              color:
                myFollowing?.findIndex((f) => f.id === user.id) !== -1
                  ? mainColor
                  : "white",
              borderColor: mainColor,
            },
          }}
        >
          {myFollowing?.findIndex((f) => f.id === user.id) !== -1
            ? "팔로우 중"
            : "+ 팔로우"}
        </Button>
      </Box>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          mt: 1,
          width: "100%",
          pl: "58px",
        }}
      >
        <StarIcon sx={{ color: mainColor, fontSize: "20px", mr: 0.5 }} />
        만족도 {satisfaction} ({reviewCount}개)
      </Typography>
      <Button
        variant="outlined"
        sx={{
          color: mainColor,
          borderColor: mainColor,
          ":hover": { borderColor: mainColor },
          width: "100%",
          mt: 2,
        }}
      >
        문의하기
      </Button>
    </Box>
  );
};
//프로젝트 상세 내용
const ProjectSection = ({ id, title, children }) => (
  <Element name={id} className="element">
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: "20px", mb: 2, fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Box>{children}</Box>
    </Box>
  </Element>
);
//스크롤 간격 등
const scrollToSection = (section) => {
  scroller.scrollTo(section, {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -128,
  });
};

//스크롤 기능
const ProjectScroll = ({ mainColor, sections }) => (
  <Sticky enabled={true} top={64} innerZ={1000} activeClass="sticky">
    <Box sx={{ mb: 4, backgroundColor: "white", padding: "8px 0" }}>
      {sections.map((section) => (
        <Button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          sx={{
            border: `1px solid ${mainColor}`,
            borderRadius: "18px",
            color: mainColor,
            padding: "4px 8px",
            mr: "10px",
          }}
        >
          {section.label}
        </Button>
      ))}
    </Box>
  </Sticky>
);
//소개 내용
const IntroContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);
//예산 내용
const BudgetContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);
//일정 내용
const ScheduleContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);
//창작자 소개 내용
const CreatorContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);
// 신뢰와 안전 내용
const TrustContent = () => (
  <Box>
    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
      크라우드 펀딩에 대한 안내
    </Typography>
    <Typography sx={{ mb: 2 }}>
      <span style={{ fontWeight: "bold" }}>
        후원은 구매가 아닌 창의적인 계획에 자금을 지원하는 일입니다.
      </span>
      <br />
      전자상거래법상 통신판매는 소비자의 청약 전 규격, 제조연월일 등 구체적인
      상품정보가 제공 가능한 것을 대상으로 합니다. 따라서 텀블벅에서의 후원은
      통신판매에 해당하지 않고, 전자상거래법 및 소비자보호규정(수령 후 7일 내
      청약철회 등)이 적용되지 않습니다.
    </Typography>
    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
      프로젝트는 계획과 달리 진행될 수 있습니다.
    </Typography>
    <Typography>
      예상을 뛰어넘는 멋진 결과가 나올 수 있지만 진행 과정에서 계획이 지연,
      변경되거나 무산될 수도 있습니다. 본 프로젝트를 완수할 책임과 권리는
      창작자에게 있습니다.
    </Typography>
  </Box>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { loginUser } = useAuth();

  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterOption, setFilterOption] = useState("all");
  // 좋아요 버튼 누르기
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/${id}`,
        );
        setProject(response.data.payload);
        setLikes(response.data.payload.likeCount);
        console.log(response.data.payload);
      } catch (err) {
        console.error(err);
      }
    };
    loadProject();
  }, [id]);

  useEffect(() => {
    // location.state가 null이 아니고, selectedTab이 undefined가 아니면 해당 값으로 설정하고, 그렇지 않으면 기본값 0으로 설정
    const initialTab =
      location.state && location.state.selectedTab !== undefined
        ? location.state.selectedTab
        : 0;
    setSelectedTab(initialTab);
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (loginUser?.id) {
      // 좋아요 상태 받아오기
      axios
        .get(`${process.env.REACT_APP_API_URL}/projects/like/${loginUser.id}`, {
          headers: {
            Authorization: loginUser.token,
          },
        })
        .then((response) => {
          const likedProjects = response.data.payload;
          const isLiked = likedProjects.some(
            (p) => p.projectId === project.projectId,
          );
          setLiked(isLiked);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [project]);

  const handleLike = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    setLikes((prevLikes) => (newLikedStatus ? prevLikes + 1 : prevLikes - 1));
    console.log(liked);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/projects/like/${project.projectId}`,
        {
          userId: project.userId,
          projectId: project.projectId,
          liked: newLikedStatus,
        },
        {
          headers: {
            Authorization: loginUser.token,
          },
        },
      );
    } catch (error) {
      console.error(error);
      // 서버 요청이 실패하면 liked 상태를 다시 원래대로 돌림
      setLiked(!newLikedStatus);
      setLikes((prevLikes) => (newLikedStatus ? prevLikes - 1 : prevLikes + 1));
    }
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterOptionChange = (event) => {
    setFilterOption(event.target.value);
  };

  const sections = [
    {
      id: "intro",
      label: "소개",
      content: <IntroContent content={project?.storyContent} />,
    },
    {
      id: "budget",
      label: "예산",
      content: <BudgetContent content={project?.budgetContent} />,
    },
    {
      id: "schedule",
      label: "일정",
      content: <ScheduleContent content={project?.scheduleContent} />,
    },
    {
      id: "creator",
      label: "창작자 소개",
      content: <CreatorContent content={project?.creatorContent} />,
    },
    { id: "trust", label: "신뢰와 안전", content: <TrustContent /> },
  ];

  const handleDonateClick = () => {
    navigate("/funding");
  };

  return (
    project && (
      <Box
        sx={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "480px",
          m: "0 auto",
          p: 3,
          paddingTop: "64px",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="black"
          sx={{ mb: 4, justifyContent: "center" }}
          TabIndicatorProps={{ style: { background: mainColor, height: 3 } }}
        >
          <Tab label="프로젝트 스토리" sx={{ flexGrow: 1 }} />
          <Tab label="공지사항" sx={{ flexGrow: 1 }} />
          <Tab label="커뮤니티" sx={{ flexGrow: 1 }} />
          <Tab label="후기" sx={{ flexGrow: 1 }} />
        </Tabs>
        {selectedTab === 0 && (
          <>
            <ProjectImage content={project.projectThumbImg} />
            <ProjectHeader
              id={project.projectId}
              title={project.projectTitle}
              participants={project.guestCount}
              goalAmount={project.totalRewardAmount}
              likes={project.likeCount}
              handleLike={handleLike}
              liked={liked}
              remainingDays={project.daysLeft}
              achievementRate={project.achievementRate}
              maker={project.UserId}
            />
            <UserProfile
              user={project?.User}
              followers="357"
              satisfaction="5.0"
              reviewCount="10"
              mainColor={mainColor}
            />

            <Box>
              <ProjectScroll mainColor={mainColor} sections={sections} />
              {sections.map((section) => (
                <ProjectSection
                  key={section.id}
                  id={section.id}
                  title={section.label}
                >
                  {section.content}
                </ProjectSection>
              ))}
              <Button
                variant="contained"
                // onClick={}
                onClick={handleDonateClick}
                sx={{
                  backgroundColor: mainColor,
                  padding: "15px",
                  color: "white",
                  fontWeight: "bold",
                  mb: 1,
                  width: "100%",
                  fontSize: "18px",
                  ":hover": { backgroundColor: mainColor, color: "white" },
                }}
              >
                프로젝트 후원하기
              </Button>
            </Box>
          </>
        )}
        {selectedTab === 1 && (
          <>
            <Announcements
              sortOrder={sortOrder}
              handleSortOrderChange={handleSortOrderChange}
              projectId={project.projectId}
            />
          </>
        )}
        {selectedTab === 2 && (
          <>
            <Community
              sortOrder={sortOrder}
              handleSortOrderChange={handleSortOrderChange}
              projectId={project.projectId}
            />
          </>
        )}
        {selectedTab === 3 && (
          <Reviews
            filterOption={filterOption}
            handleSortOrderChange={handleSortOrderChange}
            handleFilterOptionChange={handleFilterOptionChange}
            projectId={project.projectId}
          />
        )}
      </Box>
    )
  );
};

export default ProjectDetail;
