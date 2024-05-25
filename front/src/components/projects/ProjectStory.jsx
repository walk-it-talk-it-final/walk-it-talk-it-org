import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
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
  "image",
  "align",
  "color",
  "background",
];

const ProjectStory = ({ inputs, setInputs }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;

  const [storyContent, setStoryContent] = useState(""); // 프로젝트 스토리 상태
  const [budgetContent, setBudgetContent] = useState(""); // 프로젝트 예산 상태
  const [scheduleContent, setScheduleContent] = useState(""); // 프로젝트 일정 상태
  const [creatorContent, setCreatorContent] = useState(""); // 프로젝트 생성자 상태

  // Quill 에디터에서 스토리 내용이 변경될 때 호출되는 함수
  const handleChange = (content) => {
    setStoryContent(content);
  };

  // 등록 버튼 클릭 핸들러 (프로젝트 등록 버튼)
  const handleSubmit = async () => {
    console.log({ ...inputs, storyContent, budgetContent, scheduleContent, creatorContent });
    try {
      // 서버로 데이터 전송
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects`,
        { ...inputs, projectContent: storyContent, budgetContent, scheduleContent, creatorContent }, // 각각의 내용 전송
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
          mt: "10%"
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
              color: subColor4
            }}
          >
            진정성 있고 매력적인 스토리로 서포터의 마음을 움직여볼까요?{" "}
          </Typography>
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={storyContent}
          onChange={setStoryContent}
          style={{ height: "500px", marginBottom: 90 }}
          placeholder={`프로젝트 스토리를 작성해주세요. 😆`}
        />

        <div style={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "17px",
              color: "initial",
              fontWeight: "medium",
            }}
          >
            프로젝트 예산 *{" "}
          </Typography>
          <Typography
            sx={{
              variant: "body1",
              color: subColor4
            }}
          >
            프로젝트에 필요한 예산을 상세히 기입해 주세요. 정확한 예산 계획은 서포터들에게 신뢰를 줄 수 있습니다!{" "}
          </Typography>
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={budgetContent}
          onChange={setBudgetContent}
          style={{ height: "300px", marginBottom: 90 }}
          placeholder={`프로젝트 예산을 작성해주세요. 💸`}
        />


        <div style={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "17px",
              color: "initial",
              fontWeight: "medium",
            }}
          >
            프로젝트 일정 *{" "}
          </Typography>
          <Typography
            sx={{
              variant: "body1",
              color: subColor4
            }}
          >
            프로젝트 일정은 서포터들이 프로젝트의 진행 상황을 이해하는 데 큰 도움이 됩니다. 상세하고 구체적인 일정 계획을 작성해 주세요.{" "}
          </Typography>
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={scheduleContent}
          onChange={setScheduleContent}
          style={{ height: "500px", marginBottom: 90 }}
          placeholder={`프로젝트 일정을 작성해주세요. 📆`}
        />


        <div style={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "17px",
              color: "initial",
              fontWeight: "medium",
            }}
          >
            생성자 소개 *{" "}
          </Typography>
          <Typography
            sx={{
              variant: "body1",
              color: subColor4
            }}
          >
            프로젝트 생성자에 대한 소개는 서포터들에게 신뢰를 줄 수 있습니다. 생성자의 배경과 경험, 프로젝트에 대한 열정을 상세히 작성해 주세요.{" "}
          </Typography>
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={creatorContent}
          onChange={setCreatorContent}
          style={{ height: "300px", marginBottom: 10 }}
          placeholder={`프로젝트 생성자에 대한 소개를 작성해주세요. 👤`}
        />

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
