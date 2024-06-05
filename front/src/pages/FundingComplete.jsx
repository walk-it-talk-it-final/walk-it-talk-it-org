import React from "react";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string';

const FundingComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = queryString.parse(location.search);
  const source = queryParams.source;

  let title = "";
  let message = "";

  if (source === "signup") {
    title = "회원가입 완료";
    message = "회원가입을 축하드립니다.<br>워키토키에서 실현되는 프로젝트를 구경해보세요.";
  } else if (source === "addproject") {
    title = "프로젝트 생성 완료";
    message = "프로젝트 생성이 완료되었습니다.<br>프로젝트가 성공적으로 마무리 되길 기원합니다.";
  } 
  
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <CheckCircleIcon 
          color="mainColor"
          sx={{
            width: "60px", 
            height: "60px"
          }} 
        />

        <div style={{
          fontSize: "25px",
          fontWeight: "bold",
          margin: "10px"
          }}>{title}</div>

        <div style={{
          textAlign: "center",
          fontSize: "15px",
          color: "#aaa" 
          }}>
            <span dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      </div>
      
      <Button
        color="mainColor"
        onClick={() => navigate("/home")}
        style={{
          width: "260px",
          height: "60px",
          color: "#fff",
          fontSize: "20px",
          borderRadius: "7px",
          padding: "0 20px",
        }}
        variant="contained"
      >
        확인
      </Button>
      
    </div>
  );
};

export default FundingComplete;
