// 리뷰 페이지
import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Select, MenuItem, Divider, Button } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import nothingIMG from "../assets/nothing.png";


const Reviews = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id;

  const [reviews, setReviews] = useState([]);
  const [rewardOptions, setRewardOptions] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showAll, setShowAll] = useState(false);

  const stripHtmlTags = (htmlString) => {
    return htmlString.replace(/<[^>]+>/g, '');
  };

  useEffect(() => {
    const getReviewsData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/${projectId}/reviews`,
        );
        setReviews(res.data.payload);
      } catch (err) {
        console.error(err);
      }
    };
    getReviewsData();
  }, [projectId]);

  useEffect(() => {
    const fetchRewardOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/rewards/${projectId}`);
        setRewardOptions(response.data.payload);
      } catch (error) {
        console.error('Error fetching reward options:', error);
      }
    };

    fetchRewardOptions();
  }, [projectId]);

  const handleFilterOptionChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleButtonClick = () => {
    navigate(`/projectdetail/reviews/write/${projectId}`);
  };

  const filteredReviews = reviews.filter(review => filterOption === 'all' || review.Reward.rewardOption === filterOption);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return sortOrder === 'newest' ? new Date(b.reviewUploadDate) - new Date(a.reviewUploadDate) : new Date(a.reviewUploadDate) - new Date(b.reviewUploadDate);
  });

  const reviewsToShow = showAll ? sortedReviews : sortedReviews.slice(0, 5);

  const handleShowAllClick = () => {
    setShowAll(true);
  };

  return (
    <Box sx={{ minHeight: 650 }}>
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
            {rewardOptions.map((option) => (
              <MenuItem key={option.id} value={option.rewardOption}>{option.rewardOption}</MenuItem>
            ))}
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
      {sortedReviews.length === 0 ? (
        <div>
          <img src={nothingIMG} style={{ width: "50%", padding: 20, marginLeft: 100 }}></img>
          <Typography variant="body1">등록된 후기가 없습니다.</Typography>
        </div>
      ) : (
        <>
          {reviewsToShow.map((review) => (
            <Box key={review.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar src={review.profileImage} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{review.User.nickname}</Typography>
                  <Typography variant="body2" sx={{ color: subColor4, fontWeight: 'medium' }}>{review.Reward.rewardOption}</Typography>
                </Box>
              </Box>
              <div key={review.id}>
                <p style={{ fontSize: 18 }}>{stripHtmlTags(review.reviewContent)}</p>
                <small style={{ color: "darkgrey" }}>{new Date(review.reviewUploadDate).toLocaleString()}</small>
              </div>
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
        </>
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
