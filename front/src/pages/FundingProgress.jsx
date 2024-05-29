import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Divider } from "@mui/material";
import ListType from "../components/layouts/ListType";

const FundingProgress = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;

    const projects = [
        {
            id: 1,
            title: "펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목 펀딩 프로젝트 제목",
            creator: "프로젝트 생성자 1",
            progress: "33% 달성",
            amount: "5만원 +",
            remainingDays: "21일 남음",
            image: "https://via.placeholder.com/130"
        }
    ];

    const rewardOptions = ["옵션 1", "옵션 2", "옵션 3"];

    const [selectedOption, setSelectedOption] = useState(rewardOptions[0]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [showRewardInfo, setShowRewardInfo] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setSelectedQuantity(event.target.value);
    };

    const handleSaveRewardOption = () => {
        setShowRewardInfo(true);
    };

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
                <div className="fundingProject" style={{ marginTop: 70, padding: 10 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                        {projects.map((project) => (
                            <ListType
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


                    <div className="rewardSelectWrap">
                        <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 10, width: "100%" }}>리워드 옵션 선택</Typography>
                        <div style={{ width: "100%" }}>
                            <FormControl sx={{ marginBottom: 2, marginTop: 3, width: "103%" }}>
                                <InputLabel>리워드 옵션</InputLabel>
                                <Select
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                    label="리워드 옵션"
                                >
                                    {rewardOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ width: "103%" }}>
                                <TextField
                                    label="수량"
                                    type="number"
                                    value={selectedQuantity}
                                    onChange={handleQuantityChange}
                                    InputProps={{ inputProps: { min: 1 } }}
                                    fullWidth
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                color="mainColor"
                                sx={{ color: "white", width: "103%", marginTop: 5, height: 50 }}
                                onClick={handleSaveRewardOption}
                            >
                                리워드 옵션 저장
                            </Button>
                        </div>
                    </div>

                    {showRewardInfo && (
                        <>
                            <Divider sx={{ my: 4 }} />  {/* 구분선 */}

                            <div className="rewardInfoWrap">
                                <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 5 }}>리워드 옵션 정보</Typography>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 15, width: "103%" }}>
                                    <Typography variant="h6" fontWeight="bold">구성</Typography>
                                    <div style={{ width: "70%" }}>
                                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                            [옵션] {selectedOption}
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                            [수량] {selectedQuantity}
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                            [상세내용] 리워드 상세 내용 11 리워드 상세 내용 22 리워드 상세 내용 33 리워드 상세 내용 44
                                        </Typography>
                                        <div style={{ display: "flex", gap: 10, padding: 5, backgroundColor: "#FBF6F4", width: "fit-content" }}>
                                            <Typography sx={{ fontWeight: "medium" }}>프로젝트 진행일자</Typography>
                                            <Typography sx={{ fontWeight: "bold", color: mainColor }}>2024.05.24</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, width: "100%" }}>
                                    <Typography variant="h6" fontWeight="bold">가격</Typography>
                                    <div style={{ width: "70%" }}>
                                        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: "medium" }}>지불해야할 가격</Typography>
                                    </div>
                                </div>
                            </div>

                            <Divider sx={{ my: 4 }} />   {/* 구분선 */}

                            <div className="sponsorInfoWrap" style={{ width: "103%" }}>
                                <Typography variant="h5" fontWeight="bold" >후원자 정보</Typography>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 15, marginBottom: 10 }}>
                                    <Typography variant="h6" fontWeight="bold">연락처</Typography>
                                    <div style={{ width: "70%" }}>
                                        <Typography variant="body1" sx={{ marginBottom: 1 }}> [핸드폰 번호] 010-1234-5678  </Typography>
                                        <Typography variant="body1" sx={{ marginBottom: 1 }}> [이메일] user@gmail.com  </Typography>
                                    </div>
                                </div>
                                <Typography>* 위 연락처와 이메일로 후원 관련 소식이 전달됩니다.</Typography>
                                <Typography>* 연락처 및 이메일 변경은 프로필 &gt; 설정 에서 가능합니다.</Typography>
                            </div>

                            <Divider sx={{ my: 4 }} />      {/* 구분선 */}

                        </>
                    )}
                </div>
            </Box>
        </div>
    );
}

export default FundingProgress;
