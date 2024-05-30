import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import ProjectList from "../components/layouts/ProjectList";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const LikeProject = () => {
  const { loginUser } = useAuth();
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const [projects, setProjects] = useState();

  const getLikedProjectsByUserID = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/like/${loginUser.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      console.log(res.data.payload);
      setProjects(res.data.payload);
    } catch (error) {}
  };

  useEffect(() => {
    getLikedProjectsByUserID();
  }, []);

  return (
    <div className="wrap" style={{ display: "block" }}>
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
        <div className="fundingProject" style={{ marginTop: 70, padding: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            내가 찜한 프로젝트
          </Typography>
          <div
            className="subWrap"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Typography sx={{ fontSize: 8 }}>
              전체 {projects?.length}개
            </Typography>
            <select
              id="basic-select"
              name="options"
              style={{ border: "none" }}
              defaultValue="option1"
            >
              <option value="option1" disabled>
                정렬
              </option>
              <option value="option2">좋아요 많은순</option>
              <option value="option3">최신 등록순</option>
              <option value="option4">마감임박순</option>
              <option value="option5">낮은 금액순</option>
              <option value="option6">높은 금액순</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {projects &&
              projects.map((project) => <ProjectList project={project} />)}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default LikeProject;
