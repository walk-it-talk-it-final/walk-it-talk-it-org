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
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  },
  {
    label: "Image 2",
    alt: "image2",
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  },
  {
    label: "Image 3",
    alt: "image3",
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  },
  {
    label: "Image 4",
    alt: "image4",
    url: "https://images.unsplash.com/photo-1622307053412-5404f0c427c0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Image 5",
    alt: "image5",
    url: "https://media.istockphoto.com/id/1084351348/ko/%EC%82%AC%EC%A7%84/%EA%B2%BD%ED%9D%AC%EA%B6%81-%EC%84%9C%EC%9A%B8-%ED%95%9C%EA%B5%AD%EC%97%90%EC%84%9C-%ED%95%9C%EA%B5%AD-%EC%A0%84%ED%86%B5-%EA%B1%B4%EC%B6%95.jpg?s=1024x1024&w=is&k=20&c=bQ_45lSY29JE9K_CvVYZU9C0eK8zXLIRaslbbJmd4Jo=",
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
        sorted = sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "option3":
        sorted = sorted.sort((a, b) => new Date(a.projectFinishAt) - new Date(b.projectFinishAt));
        break;
      case "option4":
        sorted = sorted.sort((a, b) => a.projectTargetPrice - b.projectTargetPrice);
        break;
      case "option5":
        sorted = sorted.sort((a, b) => b.projectTargetPrice - a.projectTargetPrice);
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
          minHeight: 800
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
          <img src={nothingIMG} style={{ width: "60%", padding: 20, marginLeft: 75 }}></img>
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
