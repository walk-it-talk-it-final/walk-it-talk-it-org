import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddMaker = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;
  // useForm 폼 초기화
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      managerName: "가나다",
      managerEmail: "abcd@gmail.com",
      managerPhone: "01012345678",
      managerAccount: "01234567890",
    },
  });

  const navigate = useNavigate();
  // 핸드폰 인증(하는 척..) 구현
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthCodeInputEnabled, setIsAuthCodeInputEnabled] = useState(false); // 인증번호 입력창 활성화 여부
  const [isVerifyButtonEnabled, setIsVerifyButtonEnabled] = useState(false); // 확인 버튼 활성화 여부

  const sendAuthCode = () => {
    //  '인증번호 전송' 버튼 클릭 시 동작
    if (phoneNumber.trim() === "") {
      // 공백일 경우 아래와 같은 alert창 띄움.
      alert("전화번호를 입력해주세요.");
      resetFields();
    } else {
      // 임시로 생성된 인증번호를 변수에 저장
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      setAuthCode(verificationCode);
      setIsAuthCodeInputEnabled(true); // 인증번호 입력창 활성화
      setIsVerifyButtonEnabled(true); // 확인 버튼 활성화
      alert(`인증번호가 전송되었습니다: ${verificationCode}`); // 임시라서 alert창에 임시코드 나오게 했습니다..!!
    }
  };

  // 전화번호 입력 변경 핸들러
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setIsAuthCodeInputEnabled(e.target.value.trim() !== ""); // 전화번호 입력 필드에 값이 있으면 있으면 인증번호 입력창 활성화
  };

  // 인증번호 확인 핸들러
  const chkAuthCode = () => {
    const inputCode = document.getElementById("inputAuth").value;
    if (inputCode === authCode) {
      alert("인증되었습니다.");
    } else {
      alert("인증번호가 일치하지 않습니다.");

      // 필드 초기화
      setPhoneNumber("");
      document.getElementById("inputAuth").value = "";
    }
  };

  // 필드 초기화 함수
  const resetFields = () => {
    setPhoneNumber("");
    setAuthCode("");
    setIsAuthCodeInputEnabled(false); // 인증번호 입력창 비활성화
    setIsVerifyButtonEnabled(false); // 확인 버튼 비활성화
  };

  const [selectedBank, setSelectedBank] = useState(null);
  // 은행 목록
  const bank = [
    { label: "KEB하나은행", id: "KEB하나" },
    { label: "SC제일은행", id: "SC제일" },
    { label: "국민은행", id: "국민" },
    { label: "신한은행", id: "신한" },
    { label: "외환은행", id: "외환" },
    { label: "우리은행", id: "우리" },
    { label: "기업은행", id: "기업" },
    { label: "농협", id: "농협" },
  ];

  // 등록 버튼 클릭 핸들러
  // 프로젝트 등록
  const handleRegisterButtonClick = (data) => {
    try {
      // 토큰에서 사용자 ID 가져오기
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      data.managerBank = selectedBank;
      data.userId = userId;

      console.log(data);

      // data vaildate 유효성 검사
      navigate("/addproject", { state: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrap" style={{ display: "block" }}>
      <Box
        component="form"
        p={2}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleRegisterButtonClick)} // handleSubmit 추가
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50ch",
          gap: "30px",
        }}
      >
        <Typography
          variant="h4"
          color="initial"
          fontWeight="medium"
          marginTop="70px"
        >
          생성자 등록하기
        </Typography>
        <Typography variant="body1" color="initial">
          생성자 페이지를 멋지게 완성해서 더 많은 팬을 만들어보세요.
        </Typography>
        <div>
          <TextField
            required
            {...register("managerName", { required: true })} // register 적용
            id="managerName"
            label="이름"
            placeholder="관리자 이름"
            InputLabelProps={{
              shrink: true,
              sx: {
                "&.Mui-focused": {
                  color: mainColor,
                },
              },
            }}
            sx={{
              width: "100%",
              mb: "8%",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: subColor4,
                },
            }}
          />
          <TextField
            required
            {...register("managerEmail", { required: true })}
            id="managerEmail"
            label="이메일"
            placeholder="이메일"
            InputLabelProps={{
              shrink: true,
              sx: {
                "&.Mui-focused": {
                  color: mainColor,
                },
              },
            }}
            sx={{
              width: "100%",
              mb: "8%",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: subColor4,
                },
            }}
          />

          <Box
            // component="form" form 중첩으로 주석처리
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", width: "100%" }}>
              <TextField
                required
                {...register("managerPhone", { required: true })}
                id="managerPhone"
                label="전화번호"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    "&.Mui-focused": {
                      color: mainColor,
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  mb: "3%",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: subColor4,
                    },
                }}
              />
              <Button
                variant="outlined"
                color="mainColor"
                id="auth_btn"
                sx={{
                  width: "30%",
                  alignSelf: "flex-start",
                  ml: 1,
                  height: "55px",
                }}
                onClick={sendAuthCode}
              >
                인증번호 전송
              </Button>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <TextField
                required
                {...register("authCode", { required: true })}
                label="인증번호"
                placeholder="인증번호"
                id="inputAuth"
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    "&.Mui-focused": {
                      color: mainColor,
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  mb: "8%",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: subColor4,
                    },
                  backgroundColor: isAuthCodeInputEnabled
                    ? "inherit"
                    : "#f5f5f5",
                  pointerEvents: isAuthCodeInputEnabled ? "auto" : "none",
                  "&:hover": {
                    backgroundColor: isAuthCodeInputEnabled
                      ? "inherit"
                      : "#f5f5f5",
                  },
                }}
                disabled={!isAuthCodeInputEnabled}
              />
              <Button
                variant="outlined"
                color="mainColor"
                sx={{
                  width: "30%",
                  alignSelf: "flex-start",
                  ml: 1,
                  height: "55px",
                }}
                disabled={!isVerifyButtonEnabled}
                onClick={chkAuthCode}
              >
                확인
              </Button>
            </div>
          </Box>
        </div>
        <TextField
          required
          {...register("managerAccount", { required: true })}
          id="managerAccount"
          label="계좌정보"
          placeholder="계좌번호"
          InputLabelProps={{
            shrink: true,
            sx: {
              "&.Mui-focused": {
                color: mainColor,
              },
            },
          }}
          sx={{
            width: "100%",
            mt: "-7%",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: subColor4,
              },
          }}
        />
        <div style={{ display: "flex", width: "100%" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={bank}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="은행 선택" />
            )}
            onChange={(e) => setSelectedBank(e.target.textContent)}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="mainColor"
          sx={{ width: "100%", mt: "10%", color: "white", height: "52px" }}
        >
          등록하기
        </Button>
      </Box>
    </div>
  );
};
export default AddMaker;
