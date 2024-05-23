import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Quill 사용
const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "align",
  "color",
  "background",
  "size",
  "h1",
];

const ProjectStory = ({ inputs, setInputs }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;

  const [storyContent, setStoryContent] = useState(""); // 스토리 내용 상태

  // Quill 에디터에서 스토리 내용이 변경될 때 호출되는 함수
  const handleChange = (content) => {
    setStoryContent(content);
  };

  // 등록 버튼 클릭 핸들러 (프로젝트 등록 버튼)
  const handleSubmit = async () => {
    console.log({ ...inputs, storyContent });
    try {
      // 서버로 데이터 전송
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects`,
        { ...inputs, projectContent: storyContent }, // 스토리 내용 전송
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      alert("등록이 완료되었습니다."); // 모든 필드값이 존재하면 등록이 완료되었다는 alert 창을 띄움

      // FundingComplete 페이지로 이동
      navigate("/success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="projectStoryWrap" style={{ marginTop: "20%" }}>
      <Box
        component="div"
        p={2}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50ch",
          gap: "30px",
          mt: "10%",
        }}
      >
        <Typography variant="h4" color="initial" fontWeight="medium">
          스토리 작성
        </Typography>
        <Typography variant="body1" color="initial">
          생성자님의 프로젝트를 소개해보세요. 스토리에는 생성자님의 진심과
          목소리가 잘 녹여질 수 있도록 명확하고, 솔직하게, 친근한 어투로
          작성하세요.
        </Typography>

        <div style={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "17px",
              color: "initial",
              fontWeight: "medium",
            }}
          >
            프로젝트 스토리 *{" "}
          </Typography>
          <Typography
            sx={{
              variant: "body1",
              color: subColor4,
              mb: "5%",
            }}
          >
            진정성 있고 매력적인 스토리로 서포터의 마음을 움직여볼까요?{" "}
          </Typography>
          <ReactQuill
            theme="snow"
            formats={formats}
            value={storyContent}
            onChange={handleChange}
            style={{ height: "500px" }}
            placeholder={`프로젝트 스토리를 작성해주세요. 😆`}
          />
        </div>

        <Button
          variant="contained"
          color="mainColor"
          onClick={handleSubmit}
          sx={{ width: "100%", height: "52px", color: "white", mt: "15%" }}
        >
          프로젝트 등록하기
        </Button>
      </Box>
    </div>
  );
};

export default ProjectStory;
