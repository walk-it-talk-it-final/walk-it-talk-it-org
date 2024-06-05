import React, { useState } from 'react';
import { Box, Typography, Divider, Button, useTheme, IconButton, Select, MenuItem } from '@mui/material';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';

const announcementsData = [
  { id: 1, title: "최신 공지", date: '2024-05-01', content: '가장 최신 공지사항 내용입니다.' },
  { id: 2, title: "2", date: '2024-04-25', content: '두 번째 공지사항 내용입니다.' },
  { id: 3, title: "3", date: '2024-04-01', content: '세 번째 공지사항 내용입니다.' },
  { id: 4, title: "4", date: '2024-03-25', content: '네 번째 공지사항 내용입니다.' },
  { id: 5, title: "5", date: '2024-03-10', content: '다섯 번째 공지사항 내용입니다.' },
  { id: 6, title: "6", date: '2024-02-28', content: '여섯 번째 공지사항 내용입니다.' },
  { id: 7, title: "7", date: '2024-02-15', content: '일곱 번째 공지사항 내용입니다.' },
  { id: 8, title: '8', date: '2024-02-01', content: '여덟 번째 공지사항 내용입니다.' },
  { id: 9, title: '9', date: '2024-01-25', content: '아홉 번째 공지사항 내용입니다.' },
  { id: 10, title: '10', date: '2024-01-10', content: '열 번째 공지사항 내용입니다.' },
  { id: 11, title: '11', date: '2023-05-01', content: '열한 번째 공지사항 내용입니다.' },
  { id: 12, title: '12', date: '2023-04-25', content: '열두 번째 공지사항 내용입니다.' },
  { id: 13, title: '13', date: '2023-04-01', content: '열세 번째 공지사항 내용입니다.' },
  { id: 14, title: '14', date: '2023-03-25', content: '열네 번째 공지사항 내용입니다.' },
  { id: 15, title: '15', date: '2023-03-10', content: '열다섯 번째 공지사항 내용입니다.' },
  { id: 16, title: '16', date: '2023-02-28', content: '열여섯 번째 공지사항 내용입니다.' },
  { id: 17, title: '17', date: '2023-02-15', content: '열일곱 번째 공지사항 내용입니다.' },
  { id: 20, title: '첫 공지', date: '2023-01-10', content: '가장 처음 게시된 공지사항 내용입니다.' },
];

const Announcements = ({ sortOrder, handleSortOrderChange }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;

  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleBackClick = () => {
    setSelectedAnnouncement(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortedAnnouncements = [...announcementsData].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const startIndex = (currentPage - 1) * announcementsPerPage;
  const currentAnnouncements = sortedAnnouncements.slice(startIndex, startIndex + announcementsPerPage);

  const totalPages = Math.ceil(sortedAnnouncements.length / announcementsPerPage);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
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
          <Typography variant="h5" component="h2" sx={{  wordBreak: 'keep-all', overflowWrap: 'break-word', fontWeight: 'bold', mb: 2 }}>
            {selectedAnnouncement.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
            {selectedAnnouncement.date}
          </Typography>
          <Typography variant="body1" sx={{ wordBreak: 'keep-all', overflowWrap: 'break-word' , mb: 2 }}>
            {selectedAnnouncement.content}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={handleBackClick} 
              sx={{ 
                color: mainColor, 
                borderColor: mainColor, 
                border: '1px solid', 
                '&:hover': {
                  backgroundColor: mainColor, 
                  color: '#fff'
                }
              }}
            >
              뒤로 가기
            </Button>
          </Box>
          <Divider sx={{ borderColor: '#e0e0e0', mt: 2 }} />
        </Box>
      ) : (
        <Box>
          {currentAnnouncements.map((announcement) => (
            <Box key={announcement.id} sx={{ mb: 2 }}>
              <Box
                onClick={() => handleAnnouncementClick(announcement)}
                sx={{ cursor: 'pointer' }}
              >
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                  {announcement.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
                  {announcement.date}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: '#e0e0e0' }} />
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton 
              onClick={() => handlePageChange(1)} 
              disabled={currentPage === 1}
              sx={{ 
                color: subColor4, 
                mx: 1,
                '&:hover': {
                  color: mainColor
                }
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
                '&:hover': {
                  color: mainColor
                }
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
                  minWidth: 'auto', 
                  padding: '4px 8px',
                  '&:hover': {
                    color: mainColor
                  }
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
                '&:hover': {
                  color: mainColor
                }
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
                '&:hover': {
                  color: mainColor
                }
              }}
            >
              <LastPage />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Announcements;