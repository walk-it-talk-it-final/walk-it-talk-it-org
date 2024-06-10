// 커뮤니티
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import PostDetail from "./../components/communities/PostDetail";
import PostLists from "./../components/communities/PostLists";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import axios from "axios";
import nothingIMG from "../assets/nothing.png";

const Community = ({ sortOrder, handleSortOrderChange, projectId }) => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const navigate = useNavigate();

  const [commuPosts, setCommuPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const getCommuPostsData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}/communities`,
      );
      console.log(111, res.data.payload);
      setCommuPosts(res.data.payload);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommuPostsData();
  }, [projectId]);

  const sortedCommuPosts = () => {
    return [...commuPosts].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.commuUploadDate) - new Date(a.commuUploadDate);
      } else {
        return new Date(a.commuUploadDate) - new Date(b.commuUploadDate);
      }
    });
  };

  const handleButtonClick = () => {
    navigate(`/projectdetail/communities/write/${projectId}`);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePostClick = async (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  const handleActionChange = (e) => {
    console.log(e.target.value);
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: "407px", minHeight: 650 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          커뮤니티
        </Typography>
        {!selectedPost && (
          <Select
            value={sortOrder}
            onChange={handleSortOrderChange}
            displayEmpty
            sx={{ minWidth: 100, maxHeight: 40 }}
          >
            <MenuItem value="newest">최신순</MenuItem>
            <MenuItem value="oldest">오래된 순</MenuItem>
          </Select>
        )}
      </Box>
      <Divider sx={{ mb: 2, borderColor: mainColor, borderWidth: 2 }} />
      {commuPosts.length === 0 ? (
        <div>
          <img
            src={nothingIMG}
            style={{ width: "50%", padding: 20, marginLeft: 100 }}
          ></img>
          <Typography>등록된 커뮤니티 게시글이 없습니다.</Typography>
        </div>
      ) : (
        <>
          {selectedPost ? (
            <PostDetail
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
              onBackClick={handleBackClick}
              anchorEl={anchorEl}
              onMenuOpen={handleMenuOpen}
              onMenuClose={handleMenuClose}
              onActionChange={handleActionChange}
              mainColor={mainColor}
            />
          ) : (
            <>
              {sortedCommuPosts().map((post) => (
                <PostLists
                  key={post.id}
                  post={post}
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </>
          )}
        </>
      )}
      {!selectedPost && (
        <Box
          sx={{ position: "sticky", bottom: 30, marginLeft: 43, zIndex: 1000 }}
        >
          <Button
            variant="contained"
            color="mainColor"
            sx={{
              color: "white",
              width: 40,
              height: 60,
              borderRadius: 100,
            }}
            onClick={handleButtonClick}
          >
            <CreateOutlinedIcon sx={{ width: 50, height: 30 }} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Community;
