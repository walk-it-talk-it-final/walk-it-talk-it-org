import React, { useState } from "react";
import { Typography, Button, Box, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

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

const AnnouncePostWrite = ({ inputs, setInputs }) => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;

  const navigate = useNavigate();

  const [noticeTitle, setNoticeTitle] = useState(""); // 공지사항 제목
  const [noticeContent, setNoticeContent] = useState(""); // 공지사항 포스트 내용

  const params = useParams();
  const projectId = params.id;

  // 등록 버튼 클릭 핸들러 (프로젝트 등록 버튼)
  const handleSubmit = async () => {
    // React Quill에서 HTML 태그를 제거하고 공백을 트리밍
    const strippedPost = noticeContent.replace(/<(.|\n)*?>/g, "").trim();

    if (strippedPost !== "") {
      console.log({
        ...inputs,
        noticeTitle, // 공지사항 제목 출력
        noticeContent, // 공지사항 내용 출력
      });
      try {
        // 서버로 데이터 전송
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/projects/${projectId}/notices`,
          {
            ...inputs,
            noticeTitle,
            noticeContent,
          }, // 각각의 내용 전송
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          },
        );
        alert("공지사항이 등록되었습니다!");
        console.log(response.data);
        navigate(`/projects/${projectId}`, {
          // selectedTab 스테이트를 넘겨준다.
          state: { selectedTab: 1 },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("내용을 입력해주세요!");
    }
  };

  const handleGoBack = () => {
    navigate("/projectdetail", {
      // selectedTab 스테이트를 넘겨준다.
      state: { selectedTab: 1 },
    });
  };

  return (
    <div style={{ marginTop: "3%" }}>
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
        <Button
          variant="outlined"
          color="mainColor"
          sx={{ width: "10%", height: "30px", color: "mainColor" }}
          onClick={handleGoBack}
        >
          <ChevronLeftIcon />
        </Button>
        <Typography variant="h4" color="initial" fontWeight="medium">
          공지사항 작성
        </Typography>
        <Typography variant="body1" color="initial">
          공지사항 작성 시 중요한 정보는 명확하고 간결하게 전달해주세요!
        </Typography>

        <TextField
          required
          id="noticeTitle"
          label="공지 제목"
          variant="filled"
          value={noticeTitle}
          onChange={(e) => setNoticeTitle(e.target.value)}
          sx={{
            "& label.Mui-focused": {
              color: mainColor,
            },
            "& .MuiFilledInput-root": {
              "&:after": {
                borderBottomColor: mainColor,
              },
            },
          }}
        />

        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={noticeContent}
          onChange={setNoticeContent}
          style={{ height: "500px", marginBottom: 90 }}
          placeholder={`공지사항을 자유롭게 작성해주세요! 😆`}
        />

        <Button
          variant="contained"
          color="mainColor"
          onClick={handleSubmit}
          sx={{ width: "100%", height: "52px", color: "white" }}
        >
          게시글 등록하기
        </Button>
      </Box>
    </div>
  );
};

export default AnnouncePostWrite;
