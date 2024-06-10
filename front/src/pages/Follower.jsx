import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Follow from "./../components/profiles/Follow";
import { useLocation } from "react-router-dom";

const Follower = () => {
  const theme = useTheme();

  const location = useLocation();
  const followerList = location.state?.followerList || [];

  const [followerData, setFollowerData] = useState(followerList);

  // 팔로우/언팔로우 상태 관리
  const handleFollowToggle = (id) => {
    setFollowerData(
      followerData.map((user) =>
        user.id === id ? { ...user, following: !user.following } : user,
      ),
    );
  };

  return (
    <div
      className="wrap"
      style={{ display: "flex", justifyContent: "center", minHeight: 700 }}
    >
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
        <div className="fundingProject" style={{ marginTop: 70, padding: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            팔로워
          </Typography>
          <div
            className="subWrap"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Typography sx={{ fontSize: 20 }}>
              총 {followerList.length}명
            </Typography>
          </div>
          <div>
            {followerList.map((user) => (
              <Follow
                key={user.id}
                user={user}
                initiallyFollowing={user.following} // 초기 팔로잉 상태를 사용자 데이터에 따라 설정
                onToggleFollow={handleFollowToggle}
              />
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Follower;