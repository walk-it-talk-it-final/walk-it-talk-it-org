import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

const PostLists = ({ post, onClick }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <Box key={post.id} sx={{ mb: 2, maxWidth: "407px" }}>
            <Box
                onClick={onClick}
                sx={{ cursor: 'pointer' }}
            >
                <div style={{ display: "block", border: "1px solid lightgrey", borderRadius: 7, maxWidth: "407px", padding: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                            <Avatar
                                alt="프로필 이미지"
                                src={post.User.profileImage}
                                sx={{ width: 50, height: 50, border: "1px solid grey" }}
                            />
                            <div>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }} id="nickname">
                                    {post.User.nickname}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }} id="commuUploadDate">
                                    {formatDate(post.commuUploadDate)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "block", marginTop: 10 }}>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }} id="commuUploadDate">
                            {post.commuContent}
                        </Typography>
                        <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
                            <IconButton size="small" disabled>
                                <CommentIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: "bold" }} id="comments">
                                {post.comments ? post.comments.length : 0}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default PostLists;
