import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Follow from "./../components/profiles/Follow";
import { useLocation } from "react-router-dom";

const Following = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;

  const location = useLocation();
  const followingList = location.state?.followingList || [];
  console.log(followingList);

  const [followingData, setFollowingData] = useState();

  // 언팔로우를 클릭하면 팔로잉 리스트에서 삭제되는 역할을 함 (토글)
  const handleFollowToggle = (id) => {
    setFollowingData(followingData.filter((user) => user.id !== id));
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
            팔로잉
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
              총 {followingList.length}명
            </Typography>
          </div>
          <div>
            {/* {followingData.map((user) => (
                            <Follow 
                                key={user.id} 
                                id={user.id}
                                name={user.name} 
                                avatarUrl={user.avatarUrl} 
                                initiallyFollowing={true} // 초기 팔로잉 상태를 true로 설정
                                onToggleFollow={handleFollowToggle} // 팔로우 상태 토글 이벤트 핸들러
                            />
                        ))} */}
            {followingList.map((user) => (
              <Follow
                key={user.id}
                id={user.id}
                name={user.nickname}
                avatarUrl={user.profileImage}
                initiallyFollowing={true}
                onToggleFollow={handleFollowToggle}
              />
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Following;
