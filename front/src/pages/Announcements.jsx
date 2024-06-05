import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  useTheme,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Announcements = ({ sortOrder, handleSortOrderChange, projectId }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;

  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;
  const navigate = useNavigate();

  const [notices, setNotices] = useState();

  const getAnnouncementsData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}/notices`,
      );
      console.log(res.data.payload);
      setNotices(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAnnouncementsData();
  }, []);

  // 공지사항 작성 페이지로 이동 (동그란 펜 버튼)
  const handleButtonClick = () => {
    navigate(`/projectdetail/announcements/write/${projectId}`);
  };

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleBackClick = () => {
    setSelectedAnnouncement(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortedAnnouncements = () => {
    const arr = [...notices];
    arr.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
    setNotices([...arr]);
  };

  const startIndex = (currentPage - 1) * announcementsPerPage;
  const currentAnnouncements = notices?.slice(
    startIndex,
    startIndex + announcementsPerPage,
  );

  const totalPages = Math.ceil(notices?.length / announcementsPerPage);

  // 날짜 형식 변환
  // const formattedDate = new Date(
  //   selectedAnnouncement?.noticeUploadDate,
  // ).toLocaleDateString();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    notices && (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            공지사항
          </Typography>
          {!selectedAnnouncement && (
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              displayEmpty
              sx={{ minWidth: 100, maxHeight: 40 }}
            >
              <MenuItem value="newest">최신순</MenuItem>
              <MenuItem value="oldest">오래된 순</MenuItem>
            </Select>
          )}
        </Box>
        <Divider sx={{ mb: 2, borderColor: mainColor, borderWidth: 2 }} />
        {selectedAnnouncement ? (
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              {selectedAnnouncement?.noticeTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
              {formatDate(selectedAnnouncement?.noticeUploadDate)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedAnnouncement?.noticeContent,
                }}
              />
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleBackClick}
                sx={{
                  color: mainColor,
                  borderColor: mainColor,
                  border: "1px solid",
                  "&:hover": {
                    backgroundColor: mainColor,
                    color: "#fff",
                  },
                }}
              >
                뒤로 가기
              </Button>
            </Box>
            <Divider sx={{ borderColor: "#e0e0e0", mt: 2 }} />
          </Box>
        ) : (
          <Box>
            {currentAnnouncements.map((announcement) => (
              <Box key={announcement.id} sx={{ mb: 2 }}>
                <Box
                  onClick={() => handleAnnouncementClick(announcement)}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: "bold" }}
                  >
                    {announcement?.noticeTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                    {formatDate(announcement?.noticeUploadDate)}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "#e0e0e0" }} />
              </Box>
            ))}

            <Box
              sx={{
                position: "absolute",
                bottom: 120,
                marginLeft: 43,
                zIndex: 1000,
              }}
            >
              <Button
                variant="contained"
                color="mainColor"
                sx={{
                  color: "white",
                  width: 40,
                  height: 60,
                  borderRadius: 100,
                }}
                onClick={() => handleButtonClick()}
              >
                <CreateOutlinedIcon sx={{ width: 50, height: 30 }} />
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <IconButton
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                sx={{
                  color: subColor4,
                  mx: 1,
                  "&:hover": {
                    color: mainColor,
                  },
                }}
              >
                <FirstPage />
              </IconButton>
              <IconButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                sx={{
                  color: subColor4,
                  mx: 1,
                  "&:hover": {
                    color: mainColor,
                  },
                }}
              >
                <NavigateBefore />
              </IconButton>
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  sx={{
                    color: currentPage === index + 1 ? mainColor : subColor4,
                    mx: 1,
                    minWidth: "auto",
                    padding: "4px 8px",
                    "&:hover": {
                      color: mainColor,
                    },
                  }}
                >
                  {index + 1}
                </Button>
              ))}
              <IconButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                sx={{
                  color: subColor4,
                  mx: 1,
                  "&:hover": {
                    color: mainColor,
                  },
                }}
              >
                <NavigateNext />
              </IconButton>
              <IconButton
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                sx={{
                  color: subColor4,
                  mx: 1,
                  "&:hover": {
                    color: mainColor,
                  },
                }}
              >
                <LastPage />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    )
  );
};

export default Announcements;
