import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, InputBase, IconButton, Typography } from "@mui/material";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import CardList from '../components/layouts/CardList';


// 이미지 슬라이드
const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '250px',
    marginTop: '70px',
}




const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },
];

const Home = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;

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
        },
        {
            id: 4,
            title: "펀딩 프로젝트 4444 입니다 ",
            creator: "프로젝트 생성자 4",
            progress: "33% 달성",
            amount: "5만원 +",
            remainingDays: "8일 남음",
            image: "https://via.placeholder.com/130"
        },
        {
            id: 5,
            title: "펀딩 프로젝트 55555 입니다 ",
            creator: "프로젝트 생성자 5",
            progress: "33% 달성",
            amount: "5만원 +",
            remainingDays: "8일 남음",
            image: "https://via.placeholder.com/130"
        },
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

                <div className="slide-container">
                    <Slide duration={2000} arrows={false}>
                        {slideImages.map((slideImage, index) => (
                            <div key={index}>
                                <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                </div>
                            </div>
                        ))}
                    </Slide>
                </div>

                <div className="subWrap" style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 8 }}>전체 {projects.length}개</Typography>
                    <select id="basic-select" name="options" style={{ border: "none" }} defaultValue="option1">
                        <option value="option1" disabled >정렬</option>
                        <option value="option2">좋아요 많은순</option>
                        <option value="option3">최신 등록순</option>
                        <option value="option4">마감임박순</option>
                        <option value="option5">낮은 금액순</option>
                        <option value="option6">높은 금액순</option>
                    </select>
                </div>

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
            </Box>
        </div>
    );
};

export default Home;
