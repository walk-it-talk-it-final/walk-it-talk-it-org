import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import ListType from "../components/layouts/ListType";
import Sponsor from "../components/profiles/Sponsor";
import { useLocation } from "react-router-dom";
import ProjectList from "../components/layouts/ProjectList";
import axios from "axios";

const SponsorList = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;

  const location = useLocation();
  const { project } = location.state || {};
  const token = localStorage.getItem("token");

  const [sponsorList, setSponsorList] = useState([]);

  // 후원자 목록 불러오기
  const getMySponsor = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/${project.projectId}/sponsors`,
        {
          headers: { Authorization: token },
        },
      );
      setSponsorList(res.data.payload);
      console.log(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMySponsor();
  }, []);

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
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            후원자 리스트
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <ProjectList project={project} />
          </div>

          <div className="userProfiles" style={{ marginTop: 20 }}>
            <div
              className="subWrap"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Typography sx={{ fontSize: 8 }}>
                전체 {sponsorList.length}명
              </Typography>
              <select
                id="basic-select"
                name="options"
                style={{ border: "none" }}
                defaultValue="option1"
              >
                <option value="option1" disabled>
                  정렬
                </option>
                <option value="option2">높은 후원금액순</option>
                <option value="option3">낮은 후원금액순</option>
                <option value="option4">최근 후원순</option>
              </select>
            </div>
            {sponsorList.map((sponsor) => (
              <Sponsor
                key={sponsor.id}
                profileImage={sponsor.User.profileImage}
                guestName={sponsor.guestName}
                rewardOption={sponsor.Reward.rewardOption}
                subColor4={subColor4}
              />
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default SponsorList;
