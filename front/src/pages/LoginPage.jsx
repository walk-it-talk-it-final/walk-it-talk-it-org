import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import kakaoLoginImg from "../assets/kakao_login.png";
import naverLoginImg from "../assets/naver_login.png";
import googleLoginImg from "../assets/google_login.png";
// import googleLoginImg from "../assets/google_login.png";

const Home = () => {
  // useContext -> global state management
  const { loginUser, login, logout, kakaoLogin } = useAuth();
  kakaoLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const goSignupPage = () => {
    navigate("/signUp");
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const onSubmit = (data) => {
    // 로그인 시켜주기
    login((res) => {
      if (res.data.code !== 200) {
        Toast.fire({
          icon: "error",
          title: "틀렸습니다.",
          text: "아이디 또는 비밀번호를 다시 확인해주세요",
        });
      }
    }, data);
    reset();
  };

  const handleLogout = () => {
    logout(() => {
      Toast.fire({
        icon: "success",
        title: "정상적으로 로그아웃 되었습니다.",
      });
    });
  };
  // console.log(watch("email")) // 이메일 변경 시 값 확인

  return (
    <>
      <div className="page">
        <div className="titleWrap">
          로그인
          <br />
        </div>
        {loginUser?.id ? (
          <Button
            mt={90}
            variant="outlined"
            color="mainColor"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ display: "block" }}>
              <div className="inputWrap">
                <input
                  className="input"
                  type="text"
                  variant="outlined"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="errorMessageWrap">
                {errors.email && <span>올바른 이메일을 입력해주세요.</span>}
              </div>
            </FormControl>
            <FormControl sx={{ display: "block" }}>
              <div className="inputWrap">
                <input
                  className="input"
                  type="password"
                  variant="outlined"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="errorMessageWrap">
                {errors.password && (
                  <span>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</span>
                )}
              </div>
            </FormControl>
            <button
              className="bottomButton"
              variant="contained"
              color="mainColor"
              type="submit"
              sx={{ color: "bgColor1.main", display: "block", width: "100%" }}
            >
              로그인
            </button>
            <label>
              <input type="checkbox" />
              <span></span>
              <small class="rmb">로그인 상태 유지</small>
            </label>
            <div class="separator">
              <p>OR</p>
            </div>
            <div className="buttonWrapper">
              <button className="actionButton" onClick={goSignupPage}>
                회원 가입
              </button>
              <div className="wall">|</div>
              <button className="actionButton">비밀번호 찾기</button>
            </div>
            <div class="separator2">
              <p>소셜 계정으로 로그인</p>
            </div>
            <div className="buttonWrapper">
              <Link to={`${process.env.REACT_APP_API_URL}/auth/kakao`}>
                <img
                  src={kakaoLoginImg}
                  alt="카카오 로그인"
                  style={{ width: "7ch" }}
                />
              </Link>
              <Link to={`${process.env.REACT_APP_API_URL}/auth/naver`}>
                <img
                  src={naverLoginImg}
                  alt="네이버 로그인"
                  style={{ width: "7ch" }}
                />
              </Link>
              <Link to={`${process.env.REACT_APP_API_URL}/auth/google`}>
                <img
                  src={googleLoginImg}
                  alt="구글 로그인"
                  style={{ width: "7ch" }}
                />
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Home;
