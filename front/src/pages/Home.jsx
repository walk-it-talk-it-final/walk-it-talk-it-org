// 홈
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import ProjectList from "../components/layouts/ProjectCard";
import SlideImg from "./home/SlideImg";
import nothingIMG from "../assets/nothing.png";

// 슬라이드에 사용되는 이미지들
const slideImages = [
  {
    label: "Image 1",
    alt: "image1",
    url: "/slider1.png",
    link: "/projects/6",
  },
  {
    label: "Image 2",
    alt: "image2",
    url: "/slider3.png",
    link: "/projects/7",
  },
  {
    label: "Image 3",
    alt: "image3",
    url: "/slider5.png",
    link: "/projects/11",
  },
  {
    label: "Image 4",
    alt: "image4",
    url: "/slider6.png",
    link: "/projects/12",
  },
  {
    label: "Image 5",
    alt: "image5",
    url: "/slider7.png",
    link: "/projects/10",
  },
];

const Home = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const [projects, setProjects] = useState([]);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [sortOption, setSortOption] = useState("option1");

  const getAllProjects = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/projects/`);
      console.log("Fetched projects:", res.data.payload); // 데이터 형식 확인
      setProjects(res.data.payload);
      setSortedProjects(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  const sortProjects = (projects, option) => {
    let sorted = [...projects];
    switch (option) {
      case "option2":
        sorted = sorted.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        break;
      case "option3":
        sorted = sorted.sort(
          (a, b) => new Date(a.projectFinishAt) - new Date(b.projectFinishAt),
        );
        break;
      case "option4":
        sorted = sorted.sort(
          (a, b) => a.projectTargetPrice - b.projectTargetPrice,
        );
        break;
      case "option5":
        sorted = sorted.sort(
          (a, b) => b.projectTargetPrice - a.projectTargetPrice,
        );
        break;
      default:
        break;
    }
    return sorted;
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const sorted = sortProjects(projects, sortOption);
      setSortedProjects(sorted);
    }
  }, [sortOption, projects]);

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
          minHeight: 800,
        }}
      >
        {/* 이미지 슬라이더 부분 */}
        <SlideImg slideImages={slideImages} />

        <div
          className="subWrap"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ fontSize: 8 }}>
            전체 {sortedProjects?.length}개
          </Typography>
          <select
            id="basic-select"
            name="options"
            style={{ border: "none" }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="option1" disabled>
              정렬
            </option>
            <option value="option2">최신 등록순</option>
            <option value="option3">마감임박순</option>
            <option value="option4">낮은 금액순</option>
            <option value="option5">높은 금액순</option>
          </select>
        </div>

        {/* 프로젝트가 없을 때의 메시지 */}
        {sortedProjects.length === 0 && (
          <>
            <img
              src={nothingIMG}
              style={{ width: "60%", padding: 20, marginLeft: 75 }}
            ></img>
            <Typography variant="h5" align="center">
              현재 등록된 프로젝트가 없습니다.
            </Typography>
          </>
        )}

        {/* 프로젝트 리스트 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {sortedProjects.length > 0 &&
            sortedProjects.map((project) => (
              <ProjectList key={project.projectId} project={project} />
            ))}
        </div>
      </Box>
    </div>
  );
};

export default Home;
