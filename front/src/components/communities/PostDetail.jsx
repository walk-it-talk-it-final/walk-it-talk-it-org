import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const PostDetail = ({
  selectedPost,
  onBackClick,
  anchorEl,
  onMenuOpen,
  onMenuClose,
  onActionChange,
  mainColor,
}) => {
  const [rp, setRp] = useState(selectedPost.Replies);
  const [newComment, setNewComment] = useState("");

  const onCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const onCommentSubmit = async () => {
    if (newComment.trim() !== "") {
      const newCommentData = {
        replyContent: newComment,
      };

      try {
        // 서버에 댓글 전송
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/posts/${selectedPost.id}/comments`,
          newCommentData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          },
        );
        if (res.status === 200) {
          setRp((prev) => [...prev, res.data.payload.comment]);
          setNewComment("");
        } else {
          console.error("댓글 등록 실패");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyreplyContent: "flex-end", mt: 2, mb: 2 }}
      >
        <Button
          onClick={onBackClick}
          sx={{
            color: mainColor,
            borderColor: mainColor,
            border: "1px solid",
            "&:hover": {
              backgroundColor: mainColor,
              color: "#fff",
            },
          }}
        >
          <ChevronLeftIcon /> 목록
        </Button>
      </Box>
      <div style={{ borderBottom: "1px solid grey" }}>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <Avatar
              alt="프로필 이미지"
              src={selectedPost.User.profileImage}
              sx={{ width: 50, height: 50, border: "1px solid grey" }}
            />
            <div>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
                id="guestName"
              >
                {selectedPost.User.nickname}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary" }}
                id="commuUploadDate"
              >
                {new Date(selectedPost.commuUploadDate).toLocaleString()}
              </Typography>
            </div>
          </div>

          <IconButton
            onClick={onMenuOpen}
            aria-controls="action-menu"
            aria-haspopup="true"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
          >
            <MenuItem value="edit" onClick={onActionChange}>
              {" "}
              <Edit /> &nbsp; 수정
            </MenuItem>
            <MenuItem value="delete" onClick={onActionChange}>
              {" "}
              <DeleteIcon /> &nbsp; 삭제
            </MenuItem>
          </Menu>
        </div>
        <Typography variant="body1" sx={{ mb: 2, mt: 2 }}>
          {selectedPost.commuContent}
        </Typography>
      </div>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          댓글 {rp?.length}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {rp &&
            rp?.map((comment, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}
              >
                <Avatar
                  alt="프로필 이미지"
                  src={comment.User.profileImage}
                  sx={{ width: 50, height: 50, border: "1px solid grey" }}
                />
                <div style={{ textAlign: "left" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    id="guestName"
                  >
                    {comment.User.nickname}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary" }}
                    id="commuUploadDate"
                  >
                    {comment.replyContent}
                  </Typography>
                </div>
              </Box>
            ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Avatar
            alt="프로필 이미지"
            src="https://via.placeholder.com/50"
            sx={{ width: 50, height: 50 }}
          />
          <TextField
            variant="outlined"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={onCommentChange}
            fullWidth
            sx={{ ml: 2 }}
          />
          <Button
            onClick={() => onCommentSubmit()}
            sx={{
              ml: 2,
              color: mainColor,
              borderColor: mainColor,
              height: 53,
              border: "1px solid",
              "&:hover": {
                backgroundColor: mainColor,
                color: "#fff",
              },
            }}
          >
            등록
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostDetail;
