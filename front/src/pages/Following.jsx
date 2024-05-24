import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Follow from './../components/profiles/Follow';

const Following = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;

    // 임의로 지정한 팔로잉 데이터
    const tempData = [
        { id: 1, name: '뽀로로', avatarUrl: 'https://thumb.mt.co.kr/06/2016/07/2016071814312232941_1.jpg', following: true },
        { id: 2, name: '크롱', avatarUrl: 'https://m.segye.com/content/image/2021/07/29/20210729517145.jpg', following: true },
        { id: 3, name: '포비', avatarUrl: 'https://data.onnada.com/character/201102/C4531_2048931622_d2dee59c_5.JPG', following: true },
        { id: 4, name: '에디', avatarUrl: 'https://data.onnada.com/character/201102/C4529_2048931622_ac424d8d_3.JPG', following: true },
        { id: 5, name: '루피', avatarUrl: 'https://i.namu.wiki/i/0CGPK4s1T2AUebeIYXxDmgvZ5daUjMAPjUwfljMI3_NdjQzsOkurt3K2gKci-xMGYtxDnkS9K5PzSZUWpnkkRw.webp', following: true },
    ];

    const [followingData, setFollowingData] = useState(tempData);

    // 언팔로우를 클릭하면 팔로잉 리스트에서 삭제되는 역할을 함 (토글)
    const handleFollowToggle = (id) => {
        setFollowingData(followingData.filter(user => user.id !== id));
    };

    return (
        <div className="wrap" style={{ display: "flex", justifyContent: "center", minHeight: 700 }}>
            <Box
                component="form"
                p={2}
                noValidate
                autoComplete="off"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50ch",
                    gap: "30px",
                }}
            >
                <div className="fundingProject" style={{ marginTop: 70, padding: 10 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>팔로잉</Typography>
                    <div className="subWrap" style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <Typography sx={{ fontSize: 8 }}>총 {followingData.length}명</Typography>
                    </div>
                    <div>
                        {followingData.map((user) => (
                            <Follow 
                                key={user.id} 
                                id={user.id}
                                name={user.name} 
                                avatarUrl={user.avatarUrl} 
                                initiallyFollowing={true} // 초기 팔로잉 상태를 true로 설정
                                onToggleFollow={handleFollowToggle} // 팔로우 상태 토글 이벤트 핸들러
                            />
                        ))}
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default Following;
