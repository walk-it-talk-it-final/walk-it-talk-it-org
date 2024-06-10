// myfunding
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import ProjectList from "../components/layouts/ProjectList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import nothingIMG from "../assets/nothing.png";


const MyFunding = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [projects, setProjects] = useState([]);

  // 참여중인 프로젝트 id 찾아오기
  const getMyFunding = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/ingprojects/${loginUser.id}`,
        {
          headers: { Authorization: token },
        },
      );

      const payloads = res.data.payload;
      console.log(payloads);
      setProjects(payloads);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyFunding();
  }, []);

  const handleCardClick = (project) => {
    navigate(`/projects/${project.ProjectProjectId}`, { state: { project } });
  };

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
          minHeight: 700
        }}
      >
        <div className="fundingProject" style={{ marginTop: 70, padding: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            내가 후원한 프로젝트
          </Typography>
          {projects.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {projects.map((project) => (
                <div onClick={() => handleCardClick(project)} key={project.id}>
                  <ProjectList project={project.Project} />
                </div>
              ))}
            </div>
          ) : (
            <div>
          <img src={nothingIMG} style={{ width: "50%", padding: 20, marginLeft: 100 }}></img>
          <Typography variant="body1">참여한 펀딩 프로젝트가 없습니다.</Typography>
        </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default MyFunding;
