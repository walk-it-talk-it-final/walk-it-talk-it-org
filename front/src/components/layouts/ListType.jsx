import React, { useState } from "react";
import { Card, CardMedia, CardContent, IconButton, Typography, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";


// 일반적인 리스트형 

const ListType = ({ mainColor, title, creator, progress, amount, remainingDays, image, initiallyLiked }) => {
    const [liked, setLiked] = useState(initiallyLiked);

    const handleLikeClick = (e) => {
        e.stopPropagation();
        setLiked(!liked);
    };

    const navigate = useNavigate();



    return (
        <div className="listWrap" style={{ marginBottom: '10px', boxSizing: 'border-box', marginTop: '10px', maxHeight: '130px', minWidth: '380px', display: 'flex', flexDirection: 'row' }}>
            <Card sx={{ width: "100%", display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ position: 'relative', flex: '0 0 30%', minWidth: '130px' }}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt="Thumbnail image"
                        height="130"
                        width="130" // 이미지를 카드의 너비에 맞춤
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

                <CardContent sx={{ padding: '10px', overflow: 'hidden', flex: '1' }}>
                    <Typography variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', minHeight: '50px' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt="5px" fontWeight="bold" gutterBottom>
                        {creator}
                    </Typography>


                    <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: mainColor, fontWeight: "bold", fontSize: "0.75rem !important" }}>
                            {progress}
                        </Typography>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Typography variant="body2" sx={{ color: "#404040", fontWeight: "medium", backgroundColor: "#F1F1F1", padding: "3px", borderRadius: "5px", fontSize: "0.75rem !important" }}>
                                {amount}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#404040", fontWeight: "medium", backgroundColor: "#F1F1F1", padding: "3px", borderRadius: "5px", fontSize: "0.75rem !important" }}>
                                {remainingDays}
                            </Typography>
                        </div>
                    </div>


                </CardContent>
            </Card>
        </div>
    );
};

export default ListType;
