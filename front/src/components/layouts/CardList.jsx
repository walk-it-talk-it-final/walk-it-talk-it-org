import React, { useState } from "react";
import { Card, CardMedia, CardContent, IconButton, Typography, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// 카드형 프로젝트 리스트 컴포넌트

const ProjectList = ({ mainColor, title, creator, progress, amount, remainingDays, image, initiallyLiked  }) => {
    const [liked, setLiked] = useState(initiallyLiked);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    return (
        <div className="listWrap" style={{ width: 'calc(50% - 10px)', marginBottom: '10px', boxSizing: 'border-box', marginTop: '10px' }}>
            <Card sx={{ width: "100%" }}>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt="Thumbnail image"
                        height="130"
                        width="100%" // 이미지를 카드의 너비에 맞춤
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            color: liked ? 'red' : 'inherit',
                        }}
                        aria-label="like"
                        onClick={handleLikeClick}
                    >
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon sx={{ color: "white" }} />}
                    </IconButton>
                </Box>

                <CardContent sx={{ padding: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: '8px', minHeight: '50px' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt="5px" fontWeight="bold" gutterBottom>
                        {creator}
                    </Typography>

                    <Typography variant="body2" sx={{ color: mainColor, fontWeight: "bold", fontSize: "0.75rem !important" }}>
                            {progress}
                        </Typography>
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <Typography variant="body2" sx={{ color: "#404040", fontWeight: "medium", backgroundColor: "#F1F1F1", padding: "3px", borderRadius: "5px", fontSize: "0.75rem !important" }}>
                                {amount}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#404040", fontWeight: "medium", backgroundColor: "#F1F1F1", padding: "3px", borderRadius: "5px", fontSize: "0.75rem !important" }}>
                                {remainingDays}
                            </Typography>
                        </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectList;
