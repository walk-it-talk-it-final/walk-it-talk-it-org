import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

// 팔로우/팔로잉 컴포넌트

const Follow = ({ user, initiallyFollowing, onToggleFollow }) => {
  const [isFollowing, setIsFollowing] = useState(initiallyFollowing);

  const handleFollowClick = async () => {
    setIsFollowing((prevState) => {
      const newFollowingState = !prevState;

      if (!newFollowingState) {
        unfollowUser(user.id);
      } else {
        followUser(user.id);
        onToggleFollow(user.id);
      }
      return newFollowingState;
    });
  };

  // 유저 팔로우
  const followUser = async (userId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/follow`,
        {
          id: userId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      if (res.data.code === 200) {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 유저 언팔로우
  const unfollowUser = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/follow`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          data: {
            id,
          },
        },
      );
      if (res.data.code === 200) {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Avatar
          alt="프로필 이미지"
          src={`http://localhost:8000/${user.profileImage}`}
          sx={{ width: 50, height: 50, border: "1px solid grey" }}
        />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold" }}
          id="profileName"
        >
          {user.nickname}
        </Typography>
      </div>
      <Button
        variant="contained"
        color={isFollowing ? "subColor4" : "mainColor"} // 팔로우 상태에 따라 색상 변경
        sx={{ marginLeft: "auto", color: "white", minWidth: 100 }}
        onClick={handleFollowClick}
      >
        {isFollowing ? "언팔로우" : "팔로우"}
      </Button>
    </div>
  );
};

export default Follow;
