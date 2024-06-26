import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

// 일반적인 리스트형

const ProjectList = ({ project }) => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const { loginUser } = useAuth();
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.projectId}`, { state: { project } });
  };

  // 좋아요 버튼 누르기
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (loginUser?.id) {
      // 좋아요 상태 받아오기
      axios
        .get(`${process.env.REACT_APP_API_URL}/projects/like/${loginUser.id}`, {
          headers: {
            Authorization: token,
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

  const handleLikeClick = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

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
    }
  };

  // 리워드 최소 요금 표시하기
  const [minRewardPrice, setMinRewardPrice] = useState(null);

  useEffect(() => {
    const projectRewards = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/rewards/${project.projectId}`,
        );
        const rewards = response.data.payload;
        console.log(rewards);

        if (rewards && rewards.length > 0) {
          const minPrice = Math.min(
            ...rewards.map((reward) => reward.rewardPrice),
          );
          // 프로젝트 달성률 표시하기
          let sum = 0;
          rewards.map((r) => {
            sum += r.rewardPrice * r.rewardSellCount;
          });
          setProgress(
            Math.ceil((sum / project.projectTargetPrice) * 100).toFixed(0) +
              "%",
          );
          setMinRewardPrice(Math.floor(minPrice / 10000) + "만원 +");
        }
      } catch (error) {
        console.error(error);
      }
    };

    projectRewards();
  }, [project.projectId]);

  // 남은 일수 계산
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    if (!project || !project.projectFinishAt) return;

    const calculateDaysLeft = (finishDate) => {
      const finishTime = new Date(finishDate).getTime();
      const currentTime = new Date().getTime();
      const differenceInDays = Math.ceil(
        (finishTime - currentTime) / (1000 * 60 * 60 * 24),
      );
      return differenceInDays;
    };

    const days = calculateDaysLeft(project.projectFinishAt);
    setDaysLeft(days);
  }, [project]);

  console.log(project);

  return (
    <div
      onClick={handleClick}
      className="listWrap"
      style={{
        marginBottom: "10px",
        boxSizing: "border-box",
        marginTop: "10px",
        maxHeight: "130px",
        minWidth: "380px",
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
      }}
    >
      <Card sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Box sx={{ position: "relative", flex: "0 0 30%", minWidth: "130px" }}>
          <CardMedia
            component="img"
            image={
              project.projectThumbImg
                ? `http://localhost:8000/${project.projectThumbImg}`
                : `http://localhost:8000/public/uploads/noImage.jpg`
            }
            alt={project.projectThumbImg}
            height="130"
            width="130" // 이미지를 카드의 너비에 맞춤
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              color: liked ? "red" : "inherit",
            }}
            aria-label="like"
            onClick={handleLikeClick}
          >
            {liked ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </Box>

        <CardContent sx={{ padding: "10px", overflow: "hidden", flex: "1" }}>
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "50px",
            }}
          >
            {project.projectTitle}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mt="5px"
            fontWeight="bold"
            gutterBottom
          >
            {project.managerName}
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: mainColor,
                fontWeight: "bold",
                fontSize: "0.75rem !important",
              }}
            >
              {progress}
            </Typography>
            <div style={{ display: "flex", gap: "10px" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#404040",
                  fontWeight: "medium",
                  backgroundColor: "#F1F1F1",
                  padding: "3px",
                  borderRadius: "5px",
                  fontSize: "0.75rem !important",
                }}
              >
                {/* 리워드 최소금액 */}
                {minRewardPrice !== null ? minRewardPrice : "로딩 중..."}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#404040",
                  fontWeight: "medium",
                  backgroundColor: "#F1F1F1",
                  padding: "3px",
                  borderRadius: "5px",
                  fontSize: "0.75rem !important",
                }}
              >
                <div>
                  {daysLeft !== null ? (
                    daysLeft === 1 ? (
                      <span>하루 남음</span>
                    ) : (
                      <span>{daysLeft}일 남음</span>
                    )
                  ) : (
                    <span>로딩 중...</span>
                  )}
                </div>
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectList;
