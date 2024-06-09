import React from "react";
import { Avatar, Typography } from "@mui/material";

// 후원자 컴포넌트

const Sponsor = ({ profileImage, guestName, rewardOption, subColor4 }) => {
  return (
    <div style={{ width: "100%", height: "auto", marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Avatar
            alt="프로필 이미지"
            src={profileImage}
            sx={{ width: 50, height: 50, border: "1px solid grey" }}
          />
          <div style={{ display: "block" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} id="guestName">
              {guestName}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: subColor4, fontWeight: "bold" }}
              id="rewardOption"
            >
              {rewardOption}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
