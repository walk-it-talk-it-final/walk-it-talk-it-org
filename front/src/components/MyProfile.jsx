import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Typography, IconButton, Box } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardList from './layouts/CardList';
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/services/user";


export const MyProfile = ({ user }) => {
    const [followerNum, setFollowerNum] = useState(0);
    const [followingNum, setFollowingNum] = useState(0);
    
    const [followingList, setFollowingList] = useState();

    const [followerList, setFollowerList] = useState();

    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;
    const navigate = useNavigate();

    const getFollowerList = async () => {
        const id = user.id;
        const res = await userApi.getFollowers(id);
        setFollowerList(res.payload);
    };

    const getFollowingList = async() => {
        const id = user.id;
        const res = await userApi.getFollowings(id);
        setFollowingList(res.payload);
    }

    useEffect(()=>{
        getFollowingList();
        getFollowerList();
    }, [])

    // 각 페이지로 이동하는 함수
    const goTofundingProjectList = () => navigate("/profile/myfunding");
    const goToFollowingList = () => navigate("/profile/following");
    const goToFollowerList = () => navigate("/profile/follower");
    const goToMyProject = () => navigate("/profile/myproject");
    const goToAddProject = () => navigate("/addmaker");
    const goToLikeProject = () => navigate("/profile/likeproject");
    const goToMySettings = () => navigate("/profile/settings");




    // 카드 리스트에 담을 임시 데이터
    const projects = [
        {
            id: 1,
            title: "펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목",
            creator: "프로젝트 생성자 1",
            progress: "33% 달성",
            amount: "5만원 +",
            remainingDays: "8일 남음",
            image: "https://via.placeholder.com/130"
        },
        {
            id: 2,
            title: "펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 ",
            creator: "프로젝트 생성자 2",
            progress: "33% 달성",
            amount: "5만원 +",
            remainingDays: "8일 남음",
            image: "https://via.placeholder.com/130"
        },
        {
            id: 3,
            title: "펀딩 프로젝트 333 입니다 ",
            creator: "프로젝트 생성자 3",
            progress: "153% 달성",
            amount: "17만원 +",
            remainingDays: "15일 남음",
            image: "https://via.placeholder.com/130"
        }
    ];

    return (
        <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
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
                <div className="profileWrap" style={{ marginTop: "70px", display: "block", height: "auto" }}>

                    {/* 프로필 이미지 및 이름, 프로필 설정 div */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 20, padding: 20, alignItems: "center" }}>
                            <Avatar alt="프로필 이미지" src="https://i.namu.wiki/i/-vq_BrSekQ9__KSOwEbm1Hkb4QG4rDT-VSIDPjMtplPgaZNB8iLhD-xDki_QLocTfQPqsoy2b97-a5RLkdGHjcSscFuioHXLWb7OEsyX0u73rma5QkCySrJlycPzlgAELgzWOBcsugC-19xaqXTUOQ.webp" sx={{ width: 70, height: 70, border: "1px solid grey" }} />
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }} id="profileName">{user.nickname}</Typography>
                        </div>
                    </div>

                    {/* 후원한 프로젝트. 팔로잉, 팔로워 wrap div */}
                    <div className="numberWrap" style={{ display: "flex", justifyContent: "space-around", paddingRight: 10 }}>

                        <div style={{ textAlign: "center" }}>   {/* 각각 숫자랑 글씨 레이아웃용 div */}
                            <Typography variant="h4" gutterBottom sx={{
                                fontWeight: "bold", color: mainColor,
                                "&:hover": {
                                    cursor: "pointer"
                                }
                            }} id="myFundingNum" onClick={goTofundingProjectList} >3</Typography>    {/* 펀딩한 프로젝트 수 */}
                            <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }} >후원한 프로젝트</Typography>
                        </div>

                        <div style={{ textAlign: "center" }}>   {/* 각각 숫자랑 글씨 레이아웃용 div */}
                            <Typography variant="h4" gutterBottom sx={{
                                fontWeight: "bold", color: mainColor,
                                "&:hover": {
                                    cursor: "pointer"
                                }
                            }} id="following" onClick={goToFollowingList}  num={followingNum}>5</Typography>    {/* 팔로잉 수 */}
                            <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }} >팔로잉</Typography>
                        </div>

                        <div style={{ textAlign: "center" }}>   {/* 각각 숫자랑 글씨 레이아웃용 div */}
                            <Typography variant="h4" gutterBottom sx={{
                                fontWeight: "bold", color: mainColor,
                                "&:hover": {
                                    cursor: "pointer"
                                }
                            }} id="follower" onClick={goToFollowerList} num={followerNum}>7</Typography>      {/* 팔로워 수 */}
                            <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }} >팔로워</Typography>
                        </div>

                    </div>


                    {/* 각 해당 페이지 버튼 영역 wrap */}
                    <div className="buttonWrap" style={{ display: "flex", justifyContent: "space-evenly", marginTop: 30, borderTop: "0.5px solid lightgrey" }}>

                        <div style={{ textAlign: 'center', marginTop: 30 }}>    {/* 버튼, 기능 텍스트 묶음용 div */}
                            <IconButton sx={{
                                color: mainColor,
                                width: 80,
                                height: 80,
                                clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                                backgroundColor: "#FBF6F4",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                                onClick={goToMyProject}
                            >
                                <PersonIcon sx={{ width: 40, height: 40 }} />
                            </IconButton>
                            <Typography sx={{ marginTop: 1 }}>내 프로젝트</Typography>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 30 }}>    {/* 버튼, 기능 텍스트 묶음용 div */}
                            <IconButton sx={{
                                color: mainColor,
                                width: 80,
                                height: 80,
                                clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                                backgroundColor: "#FBF6F4",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                                onClick={goToAddProject}
                            >
                                <AddIcon sx={{ width: 40, height: 40 }} />
                            </IconButton>
                            <Typography sx={{ marginTop: 1 }}>새 프로젝트</Typography>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 30 }}>    {/* 버튼, 기능 텍스트 묶음용 div */}
                            <IconButton sx={{
                                color: mainColor,
                                width: 80,
                                height: 80,
                                clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                                backgroundColor: "#FBF6F4",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                                onClick={goToLikeProject}
                            >
                                <FavoriteIcon sx={{ width: 40, height: 40 }} />
                            </IconButton>
                            <Typography sx={{ marginTop: 1 }}>찜한 프로젝트</Typography>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 30 }}>    {/* 버튼, 기능 텍스트 묶음용 div */}
                            <IconButton sx={{
                                color: mainColor,
                                width: 80,
                                height: 80,
                                clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                                backgroundColor: "#FBF6F4",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                                onClick={goToMySettings}
                            >
                                <SettingsIcon sx={{ width: 40, height: 40 }} />
                            </IconButton>
                            <Typography sx={{ marginTop: 1 }}>프로필 수정</Typography>
                        </div>
                    </div>
                    <div className="recentView" style={{ marginTop: 50, padding: 10 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>최근에 본 프로젝트</Typography>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                            {projects.map((project) => (
                                <CardList
                                    key={project.id}
                                    mainColor={mainColor}
                                    title={project.title}
                                    creator={project.creator}
                                    progress={project.progress}
                                    amount={project.amount}
                                    remainingDays={project.remainingDays}
                                    image={project.image}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );
};
