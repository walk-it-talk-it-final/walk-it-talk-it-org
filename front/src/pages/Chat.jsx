import React from "react";
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

const APP_ID = "1DACBD41-B076-4701-8874-E1F041400D66";

const Chat = () => {
  const USER_ID = localStorage.getItem("userId") || "익명";
  const USER_NIC = localStorage.getItem("nickname") || "익명";
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
