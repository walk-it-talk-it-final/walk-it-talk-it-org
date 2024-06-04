import {
  Button,
  InputLabel,
  TextField,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //회원가입 버튼 동작
  const onRegist = async (data) => {
    const { nickname, email, password, passwordCheck } = data;
    try {
      if (
        nickname &&
        email &&
        password &&
        passwordCheck &&
        password === passwordCheck
      ) {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/join`,
          {
            nickname,
            email,
            password,
          },
        );
        if (res.data.code === 200) {
          Swal.fire({
            title: "축하합니다!",
            text: res.data.message,
            icon: "success",
          });
          navigate("/success?source=signup");
        } else {
          throw new Error(res.data.message);
        }
      } else {
        throw new Error("입력값을 확인해주세요");
      }
    } catch (err) {
      Swal.fire({
        title: "에러 발생",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Typography variant="h4" color="initial" sx={{ marginTop: "50px" }}>
        회원가입
      </Typography>
      {/* form tag 시작 */}
      <Box
        component="form"
        my={4}
        p={2}
        borderRadius={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50ch",
          gap: "30px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onRegist)}
      >
        {/* nickname */}
        <TextField
          error={errors.nickname ? true : false}
          helperText={errors.nickname && "닉네임은 필수 입력값입니다."}
          label="사용자 닉네임"
          variant="outlined"
          {...register("nickname", { required: true })}
        />
        {/* email */}
        <TextField
          error={errors.email ? true : false}
          helperText={errors.email && "이메일은 필수 입력값입니다."}
          label="이메일"
          variant="outlined"
          autoFocus
          {...register("email", { required: true })}
        />
        {/* password */}
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">(필수) 비밀번호</InputLabel>
          <OutlinedInput
            {...register("password", { required: true })}
            id="password"
            autoComplete="new-password"
            type={showPassword ? "text" : "password"}
            error={errors.password ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {/* password check */}
        <FormControl variant="outlined">
          <InputLabel htmlFor="PasswordCheck">(필수) 비밀번호 확인</InputLabel>
          <OutlinedInput
            {...register("passwordCheck", { required: true })}
            id="PasswordCheck"
            autoComplete="new-password"
            error={errors.passwordCheck ? true : false}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="PasswordCheck"
          />
        </FormControl>
        {/* button */}
        <Button
          type="submit"
          variant="contained"
          color="mainColor"
          sx={{
            display: "block",
            height: "60px",
            marginTop: "50px",
            color: "#fff",
          }}
        >
          가입하기
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
