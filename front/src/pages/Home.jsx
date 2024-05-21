import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, InputBase, IconButton, Typography } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CardList from '../components/layouts/CardList';


// 슬라이드에 사용되는 이미지들 
const slideImages = [
    {
        label: "Image 1",
        alt: "image1",
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },

    {
        label: "Image 2",
        alt: "image2",
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    },

    {
        label: "Image 3",
        alt: "image3",
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },

    {
        label: "Image 4",
        alt: "image4",
        url: 'https://images.unsplash.com/photo-1622307053412-5404f0c427c0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },

    {
        label: "Image 5",
        alt: "image5",
        url: 'https://media.istockphoto.com/id/1084351348/ko/%EC%82%AC%EC%A7%84/%EA%B2%BD%ED%9D%AC%EA%B6%81-%EC%84%9C%EC%9A%B8-%ED%95%9C%EA%B5%AD%EC%97%90%EC%84%9C-%ED%95%9C%EA%B5%AD-%EC%A0%84%ED%86%B5-%EA%B1%B4%EC%B6%95.jpg?s=1024x1024&w=is&k=20&c=bQ_45lSY29JE9K_CvVYZU9C0eK8zXLIRaslbbJmd4Jo=',
    },
];


// 이미지 슬라이드
const renderSlides = slideImages.map(image => (
    <div>
        <img src={image.url} />
    </div>
));

const Home = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;

    // 이미지 슬라이드 캐러셀 제어
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
        setCurrentIndex(index);
    }

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

                {/* 이미지 슬라이더 부분 */}
                <div style={{marginTop: 70}}>
                    <Carousel
                        showArrows={true}
                        autoPlay={true}
                        infiniteLoop={true}
                        interval={2000}
                        showThumbs={false}
                        selectedItem={slideImages[currentIndex]}
                        showStatus={false}
                        onChange={handleChange}
                        >
                        {renderSlides}
                    </Carousel>
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
