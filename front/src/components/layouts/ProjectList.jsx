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

const ProjectList = ({ mainColor, progress, initiallyLiked, project }) => {
  const [liked, setLiked] = useState(initiallyLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const [daysLeft, setDaysLeft] = useState(null);

  // 남은 일수 계산
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
      className="listWrap"
      style={{
        width: "calc(50% - 10px)",
        marginBottom: "10px",
        boxSizing: "border-box",
        marginTop: "10px",
      }}
    >
      <Card sx={{ width: "100%" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={
              project.projectThumbImg
                ? `http://localhost:8000/${project.projectThumbImg}`
                : `http://localhost:8000/public/uploads/noImage.jpg`
            }
            // image={project.projectThumbImg}
            alt={project.projectThumbImg}
            height="130"
            width="100%" // 이미지를 카드의 너비에 맞춤
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

        <CardContent
          sx={{
            padding: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              marginBottom: "8px",
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
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
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
              {project.projectTargetPrice}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectList;