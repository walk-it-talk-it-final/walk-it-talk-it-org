import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import ListType from "../components/layouts/ListType";
import Sponsor from "../components/profiles/Sponsor";


const SponsorList = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;
    const subColor4 = theme.palette.subColor4.main;



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


    // 임의로 후원자 데이터 넣어놓은 것
    const sponsorLists = [
        {
            id: 1,
            profileImage: "https://i.namu.wiki/i/-vq_BrSekQ9__KSOwEbm1Hkb4QG4rDT-VSIDPjMtplPgaZNB8iLhD-xDki_QLocTfQPqsoy2b97-a5RLkdGHjcSscFuioHXLWb7OEsyX0u73rma5QkCySrJlycPzlgAELgzWOBcsugC-19xaqXTUOQ.webp",
            guestName: "우사기",
            rewardOption: "리워드 옵션 1"
        },
        {
            id: 2,
            profileImage: "https://www.doolymuseum.or.kr/html/images/sub0104_06.png",
            guestName: "고길동",
            rewardOption: "리워드 옵션 3"
        },
        {
            id: 3,
            profileImage: "https://img.mbn.co.kr/filewww/news/2014/06/20/1403246858.jpg",
            guestName: "둘리",
            rewardOption: "리워드 옵션 2"
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


                <div className="fundingProject" style={{ marginTop: 70, padding: 10 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>후원자 리스트</Typography>
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

                    <div className="userProfiles" style={{ marginTop: 20 }}>
                        <div className="subWrap" style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                            <Typography sx={{ fontSize: 8 }}>전체 {sponsorLists.length}명</Typography>
                            <select id="basic-select" name="options" style={{ border: "none" }} defaultValue="option1">
                                <option value="option1" disabled >정렬</option>
                                <option value="option2">높은 후원금액순</option>
                                <option value="option3">낮은 후원금액순</option>
                                <option value="option4">최근 후원순</option>
                            </select>
                        </div>
                        {sponsorLists.map((sponsor) => (
                            <Sponsor
                                key={sponsor.id}
                                profileImage={sponsor.profileImage}
                                guestName={sponsor.guestName}
                                rewardOption={sponsor.rewardOption}
                                subColor4={subColor4}
                            />
                        ))}
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default SponsorList;