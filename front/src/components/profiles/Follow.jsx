import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Follow = ({ id, name, avatarUrl, initiallyFollowing, onToggleFollow }) => {
    const [isFollowing, setIsFollowing] = useState(initiallyFollowing);

    const handleFollowClick = () => {
        setIsFollowing(prevState => {
            const newFollowingState = !prevState;
            if (!newFollowingState) {
                onToggleFollow(id);
            }
            return newFollowingState;
        });
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: 20 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <Avatar
                    alt="프로필 이미지"
                    src={avatarUrl}
                    sx={{ width: 50, height: 50, border: "1px solid grey" }}
                />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }} id="profileName">{name}</Typography>
            </div>
            <Button
                variant="contained"
                color={isFollowing ? "subColor4" : "mainColor"} // 팔로우 상태에 따라 색상 변경
                sx={{ marginLeft: 'auto', color: "white", minWidth: 100 }}
                onClick={handleFollowClick}
            >
                {isFollowing ? '언팔로우' : '팔로우'}
            </Button>
        </div>
    );
}

export default Follow;
