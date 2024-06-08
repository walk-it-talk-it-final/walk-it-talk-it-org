import React, { useEffect } from "react";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Chat = () => {
  const APP_ID = "1DACBD41-B076-4701-8874-E1F041400D66";

  const USER_ID = localStorage.getItem("userId") || "익명";
  const USER_NIC = localStorage.getItem("nickname") || "익명";

  // 로그인 검사 후 페이지 이동
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  useEffect(() => {
    if (!loginUser) {
      navigate("/signin");
    }

    const updateUserProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${loginUser.id}`,
          {
            headers: {
              Authorization: loginUser.token,
            },
          },
        );

        if (!res.data.payload) {
          navigate("/signin");
        }
        console.log(res.data);
      } catch (err) {
        console.error(err);
        navigate("/signin");
      }
    };

    updateUserProfile();
  }, [loginUser, navigate]);

  const colorSet = {
    "--sendbird-light-primary-500": "#FF7237",
    "--sendbird-light-primary-400": "#FBF6F4",
    "--sendbird-light-primary-300": "#FF7237",
    "--sendbird-light-primary-200": "#654039",
    "--sendbird-light-primary-100": "#817F82",
  };
  return (
    <div className="App">
      <SendbirdApp
        appId={APP_ID}
        userId={USER_ID}
        theme="light"
        showSearchIcon={true}
        nickname={USER_NIC}
        colorSet={colorSet}
      />
    </div>
  );
};

export default Chat;
