import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Typography, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("USER");
  const token = localStorage.getItem("token");
  const [inputValue, setInputValue] = useState("");
  // 원래 지정한 사진으로 초기값 설정
  const [profileImage, setProfileImage] = useState();
  const [profilePreview, setProfilePreview] = useState();
  const [profileImgUrl, setProfileImgUrl] = useState();

  // 유저 프로필 받아오기
  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${loginUser.id}`,
        {
          headers: { Authorization: token },
        },
      );
      setProfileImgUrl(res.data.payload.profileImage);
      setProfilePreview(res.data.payload.profileImage);
      setNickname(res.data.payload.nickname);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [token]);

  // 닉네임 입력한 값으로 바꾸기
  const handlenickChange = (event) => {
    setInputValue(event.target.value);
  };

  // 업로드한 파일로 이미지 교체
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 바꾼 값(프로필 이미지, 닉네임) 서버에 업로드
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nickname", inputValue);
    console.log(profileImage);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/modifyProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        },
      );
      if (res.status === 200) {
        alert("프로필이 저장되었습니다.");
        // 완료 시 프로필 페이지로 이동
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        }}
      >
        <div
          className="profileSettingsWrap"
          style={{ marginTop: 70, padding: 10 }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            프로필 수정
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: 20,
            }}
          >
            <Avatar
              alt="프로필 이미지"
              src={`http://localhost:8000/${profilePreview}`}
              sx={{ width: 90, height: 90, border: "1px solid grey" }}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  border: "none",
                  ":hover": { border: "none", backgroundColor: "transparent" },
                }}
              >
                프로필 이미지 수정
              </Button>
            </label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", width: "30%" }}
            >
              닉네임
            </Typography>
            <TextField
              variant="outlined"
              value={inputValue}
              placeholder={nickname}
              onChange={handlenickChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </div>

          <Button
            variant="contained"
            color="mainColor"
            onClick={handleSubmit}
            sx={{ marginTop: 13, width: "100%", height: 50, color: "white" }}
          >
            저장하기
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
