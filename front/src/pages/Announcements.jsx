import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';

const announcementsData = [
  { id: 1, title: "실시간 순위 1위 및 펀딩 100명 감사 이벤트 🎉", date: '2024-05-01', content: '첫 번째 공지사항 내용입니다.' },
  { id: 2, title: "자연의 신비 에코리움 🌿 비하인드 스토리", date: '2024-04-25', content: '두 번째 공지사항 내용입니다.' },
  { id: 3, title: "에코리움 & 박물관 투어 펀딩 오픈런 이벤트 🔥", date: '2024-04-01', content: '세 번째 공지사항 내용입니다.' },
  // ... 추가 공지사항 데이터
];

const Announcements = ({ mainColor, sortOrder }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleBackClick = () => {
    setSelectedAnnouncement(null);
  };

  const sortedAnnouncements = [...announcementsData].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <Box>
      {selectedAnnouncement ? (
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: mainColor, mb: 2 }}>
            {selectedAnnouncement.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
            {selectedAnnouncement.date}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
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
          <Divider sx={{ borderColor: '#e0e0e0', mt: 2}} />
        </Box>
      ) : (
        sortedAnnouncements.map((announcement) => (
          <Box key={announcement.id} sx={{ mb: 2 }}>
            <Box
              onClick={() => handleAnnouncementClick(announcement)}
              sx={{ cursor: 'pointer' }}
            >
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: mainColor }}>
                {announcement.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
                {announcement.date}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: '#e0e0e0' }} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default Announcements;
