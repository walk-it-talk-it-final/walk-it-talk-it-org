import React from "react";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";


const FundingComplete = () => {
  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate("/");
  };
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
        color= "mainColor"
        sx={{
          width: "60px", 
          height: "60px"
          }} />

        <div style={{
          fontSize: "25px",
          fontWeight: "bold",
          margin: "10px"
          }}>펀딩 완료</div>

        <div style={{
          textAlign: "center",
          fontSize: "15px",
          color: "#aaa" 
          }}>
            펀딩이 완료되었습니다.
            <br/>
            채팅을 통해 창작자 및 후원자들과 소통해보세요.
              

        </div>
      </div>
      
        <Button
        color="mainColor"
        onClick={navigateToMain}
          style={{
            width: "100%",
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
