import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, Divider } from '@mui/material';
import PostDetail from './../components/communities/PostDetail';
import PostLists from './../components/communities/PostLists';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import axios from 'axios';

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

    // 포스트 작성 페이지로 이동 (동그란 펜 버튼)
    const handleButtonClick = () => {
        navigate(`/projectdetail/communities/write/${projectId}`);
    };

    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    // 게시물 정렬 부분 (게시글 날짜 기준)
    const sortedCommuPosts = () => {
        return [...commuPosts].sort((a, b) => {
            if (sortOrder === "newest") {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });
    };

    // 게시글 및 댓글 상태 
    const handlePostClick = (post) => {
        setSelectedPost(post);      // 선택된 게시물 설정
        setComments(post.comments || []);       // 선택된 게시물의 댓글 설정. 댓글이 없을 땐 빈 배열로 설정함
    };

    // 뒤로가기 버튼
    const handleBackClick = () => {
        setSelectedPost(null);
    };

    // 수정/삭제 메뉴 부분
    const handleActionChange = (e) => {
        // 수정/삭제 로직 구현 (기능은 빼기로 해서 형태만 만들어놨읍니다)
        console.log(e.target.value);
    };

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // 댓글 입력 부분
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 등록
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
        <Box sx={{ maxWidth: "407px" }}>
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
                </>
            )}
        </Box>
    );
};

export default Community;
