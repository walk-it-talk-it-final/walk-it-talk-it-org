import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, Divider } from '@mui/material';
import PostDetail from './../components/communities/PostDetail';
import PostLists from './../components/communities/PostLists';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';


const Community = ({ sortOrder, handleSortOrderChange }) => {

    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;

    const navigate = useNavigate();

    // 포스트 작성 페이지로 이동 (동그란 펜 버튼)
    const handleButtonClick = () => {
        navigate('/projectdetail/community/write');
    };

    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);


    // 예시 데이터
    const communityData = [
        {
            id: 1,
            profileImage: "https://static.lingq.com/media/resources/collections/images/2021/11/06/c75355dac2_ITwk91k.jpeg",
            guestName: "최자두",
            commuUploadDate: "2024-05-28",
            commuContent: "새콤하게 자 달콤하게 두 ~!",
            comments: []
        },
        {
            id: 2,
            profileImage: "https://img1.daumcdn.net/thumb/R1280x0/?fname=https://t1.daumcdn.net/brunch/service/user/bMWg/image/rOU4v3RcKb1S_Apntvoa-v6e4BY.png",
            guestName: "이기영",
            commuUploadDate: "2024-05-27",
            commuContent: "바나나가 맛있어요 ㅠㅜ",
            comments: []
        },
        {
            id: 3,
            profileImage: "https://www.doolymuseum.or.kr/html/images/sub0104_06.png",
            guestName: "고길동",
            commuUploadDate: "2023-07-25",
            commuContent: "요리보고저리봐도 알 수 없는 둘리~ 둘리~ ",
            comments: []
        },
        {
            id: 4,
            profileImage: "https://static.ebs.co.kr/images/public/lectures/2014/06/19/10/bhpImg/44deb98d-1c50-4073-9bd7-2c2c28d65f9e.jpg",
            guestName: "뽀로로",
            commuUploadDate: "2003-11-27",
            commuContent: "뽀롱뽀롱 뽀로로 ",
            comments: []
        }
    ];


    // 게시물 정렬 부분 (게시글 날짜 기준)
    const sortedPosts = [...communityData].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.commuUploadDate) - new Date(a.commuUploadDate);
        } else {
            return new Date(a.commuUploadDate) - new Date(b.commuUploadDate);
        }
    });


    // -----------------------------------------------------------------------------


    // 게시글 및 댓글 상태 
    const handlePostClick = (post) => {
        setSelectedPost(post);      // 선택된 게시물 설정
        setComments(post.comments || []);       // 선택된 게시물의 댓글 설정. 댓글이 없을 땐 빈 배열로 설정함
    };


    // 뒤로가기 버튼
    const handleBackClick = () => {
        setSelectedPost(null);
    };


    // -----------------------------------------------

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

    // -----------------------------------------------


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
                    {sortedPosts.map((post) => (
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
