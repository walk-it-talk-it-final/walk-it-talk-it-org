import React, { useState } from 'react';
import { Box, Typography, Avatar, Select, MenuItem, Divider, Button } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate } from 'react-router-dom';


const reviewsData = [
  { id: 1, name: "김철수", date: '2024-05-01', content: '제품을 사용해보니 아주 만족스럽습니다. 추천합니다!', option: '프리미엄 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 2, name: "이영희", date: '2024-04-21', content: '전반적으로 괜찮지만 개선의 여지가 있습니다.', option: '베이직 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 3, name: "박민수", date: '2024-04-15', content: '가성비 좋고 사용하기 편합니다.', option: '스탠다드 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 4, name: "최지혜", date: '2024-04-10', content: '특별한 점은 없지만 무난한 제품입니다.', option: '베이직 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 5, name: "김지훈", date: '2024-04-01', content: '가격 대비 성능이 좋습니다. 만족합니다.', option: '프리미엄 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 6, name: "이준호", date: '2024-03-21', content: '기대 이하입니다. 재구매는 하지 않을 것 같습니다.', option: '베이직 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 7, name: "박서연", date: '2024-03-10', content: '사용법도 간단하고 아주 만족합니다.', option: '스탠다드 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 8, name: "한지민", date: '2024-03-01', content: '전반적으로 만족스럽습니다.', option: '프리미엄 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 9, name: "정민우", date: '2024-02-21', content: '가격에 비해 성능이 평범합니다.', option: '베이직 PKG', photo: 'https://via.placeholder.com/150' },
  { id: 10, name: "최유진", date: '2024-02-15', content: '매우 만족하며 사용하고 있습니다.', option: '프리미엄 PKG', photo: 'https://via.placeholder.com/150' }
];

const Reviews = ({ mainColor, subColor4, sortOrder, filterOption, handleSortOrderChange, handleFilterOptionChange }) => {
  const navigate = useNavigate();

  // 리뷰 작성 페이지로 이동 (동그란 펜 버튼)
  const handleButtonClick = () => {
      navigate('/projectdetail/review/write');
  };

  const [showAll, setShowAll] = useState(false);

  const filteredReviews = reviewsData.filter(review => filterOption === 'all' || review.option === filterOption);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return sortOrder === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
  });

  const reviewsToShow = showAll ? sortedReviews : sortedReviews.slice(0, 5);

  const handleShowAllClick = () => {
    setShowAll(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          후기
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Select
            value={filterOption}
            onChange={handleFilterOptionChange}
            displayEmpty
            sx={{ minWidth: 120, maxHeight: 40, mr: 2 }}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="프리미엄 PKG">프리미엄 PKG</MenuItem>
            <MenuItem value="베이직 PKG">베이직 PKG</MenuItem>
            <MenuItem value="스탠다드 PKG">스탠다드 PKG</MenuItem>
          </Select>
          <Select
            value={sortOrder}
            onChange={handleSortOrderChange}
            displayEmpty
            sx={{ minWidth: 100, maxHeight: 40 }}
          >
            <MenuItem value="newest">최신순</MenuItem>
            <MenuItem value="oldest">오래된 순</MenuItem>
          </Select>
        </Box>
      </Box>
      <Divider sx={{ mb: 2, borderColor: mainColor, borderWidth: 2 }} />
      {reviewsToShow.map((review) => (
        <Box key={review.id} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar src={review.photo} sx={{ mr: 2 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{review.name}</Typography>
              <Typography variant="body2" sx={{ color: subColor4 }}>{review.option}</Typography>
            </Box>
          </Box>
          <Typography sx={{ mb: 1 }}>{review.content}</Typography>
          <Typography variant="body2" color="textSecondary">{review.date}</Typography>
          <Divider sx={{ borderColor: '#e0e0e0', mt: 2 }} />
        </Box>
      ))}
      {!showAll && sortedReviews.length > 5 && (
        <Button
          variant="outlined"
          onClick={handleShowAllClick}
          sx={{
            color: mainColor,
            borderColor: mainColor,
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: mainColor,
              borderColor: mainColor,
              color: '#fff'
            },
            mt: 2,
            width: '100%',
            fontSize: '16px'
          }}
        >
          후기 전체보기
        </Button>
      )}
      <Box sx={{ position: 'sticky', bottom: 50, marginLeft: 43, zIndex: 1000 }}>
                        <Button
                            variant='contained'
                            color='mainColor'
                            sx={{
                                color: 'white',
                                width: 40,
                                height: 60,
                                borderRadius: 100,
                            }}
                            onClick={handleButtonClick}
                        >
                            <CreateOutlinedIcon sx={{ width: 50, height: 30 }} />
                        </Button>
                    </Box>
    </Box>
  );
};

export default Reviews;
