import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
    Typography,
    Button,
    Box,
} from "@mui/material";
import CardList from '../components/layouts/CardList';


const LikeProject = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;

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
        <div className="wrap" style={{ display: "block" }}>
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
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>내가 찜한 프로젝트</Typography>
                    <div className="subWrap" style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
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
                                initiallyLiked={true} // 항상 찜한 상태로 설정
                            />
                        ))}
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default LikeProject;