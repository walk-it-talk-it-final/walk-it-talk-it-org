// 커뮤니티 
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, Divider } from '@mui/material';
import PostDetail from './../components/communities/PostDetail';
import PostLists from './../components/communities/PostLists';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import nothingIMG from "../assets/nothing.png";

const Community = ({ sortOrder, handleSortOrderChange, projectId }) => {

    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;
    const navigate = useNavigate();

    const [commuPosts, setCommuPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCommuPostsData = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/projects/${projectId}/communities`,
            );
            console.log(res.data.payload);
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

    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setComments(post.comments || []);
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

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            const newComments = [...comments, { profileImage: "https://via.placeholder.com/50", guestName: "You", replyContent: newComment }];
            setComments(newComments);
            setNewComment("");
            setSelectedPost({ ...selectedPost, comments: newComments });
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: "407px", minHeight: 650 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
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
                <div style={{textAlign: "center"}}>
                    <img src={nothingIMG} style={{ width: "50%", padding: 20 }}></img>
                    <Typography>등록된 커뮤니티 게시글이 없습니다.</Typography>
                </div>
            ) : (
                <>
                    {selectedPost ? (
                        <PostDetail
                            selectedPost={selectedPost}
                            onBackClick={handleBackClick}
                            onCommentChange={handleCommentChange}
                            onCommentSubmit={handleCommentSubmit}
                            anchorEl={anchorEl}
                            onMenuOpen={handleMenuOpen}
                            onMenuClose={handleMenuClose}
                            onActionChange={handleActionChange}
                            newComment={newComment}
                            comments={comments}
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
                <Box sx={{ position: 'sticky', bottom: 30, marginLeft: 43, zIndex: 1000 }}>
                    <Button
                        variant='contained'
                        color='mainColor'
                        sx={{
                            color: 'white',
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
