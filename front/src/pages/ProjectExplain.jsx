import React, { useState } from 'react';
import { Box, Button, Typography, Tabs, Tab, useTheme, IconButton, Avatar, Divider, MenuItem, Select } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Element, scroller } from 'react-scroll';
import Sticky from 'react-stickynode';
import Reviews from './Reviews.jsx'
import Announcements from './Announcements.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Community from './Community.jsx';

//프로젝트 이미지
const ProjectImage = () => (
  <Box sx={{ width: '100%', height: '300px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#888', mb: 4 }}>
    프로젝트 이미지
  </Box>
);

//프로젝트 제목
const ProjectTitle = ({ title }) => (
  <Typography variant="h1" sx={{ fontSize: '24px', mb: 2 }}>
    <b>{title}</b>
  </Typography>
);

//프로젝트 설명
const ProjectDescription = ({ description }) => (
  <Typography variant="body1" sx={{ fontSize: '16px', mb: 4 }}>
    {description}
  </Typography>
);

//프로젝트 참여율 및 달성률
const ProjectStats = ({ participants, goalAmount, mainColor, subColor4, remainingDays, achievementRate }) => (
  <Box sx={{ display: 'flex-start', flexDirection: 'column', alignItems: 'center', mr: 4 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography sx={{ color: mainColor }}>
        <span style={{ fontWeight: 'bold', fontSize: '25px' }}>{participants}</span>명 참여
      </Typography>
      <Box sx={{ backgroundColor: '#FFDED1', borderRadius: 1, px: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '15px', color: mainColor }}>{remainingDays}일 남음</Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography>
        <span style={{ fontWeight: 'bold', fontSize: '25px' }}>{goalAmount}</span>원 달성
      </Typography>
      <Box sx={{ backgroundColor: '#E8e8e8', borderRadius: 1, px: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '15px', color: subColor4 }}>{achievementRate}% 달성</Typography>
      </Box>
    </Box>
  </Box>
);

//프로젝트 좋아요 및 공유 수
const ProjectActions = ({ likes, shares, subColor4, handleLike, isLiked }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton onClick={handleLike}>
        {isLiked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: subColor4 }} />}
      </IconButton>
      <Typography>{likes}</Typography>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton>
        <ShareIcon sx={{ color: subColor4 }} />
      </IconButton>
      <Typography>{shares}</Typography>
    </Box>
  </Box>
);

// 프로젝트 상단 모음
const ProjectHeader = ({ title, description, participants, goalAmount, likes, shares, mainColor, subColor4, handleLike, isLiked, remainingDays, achievementRate }) => (
  <Box sx={{ textAlign: 'left', mb: 4 }}>
    <ProjectTitle title={title} />
    <ProjectDescription description={description} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      <ProjectStats participants={participants} goalAmount={goalAmount} mainColor={mainColor} subColor4={subColor4} remainingDays={remainingDays} achievementRate={achievementRate} />
      <ProjectActions likes={likes} shares={shares} subColor4={subColor4} handleLike={handleLike} isLiked={isLiked} />
    </Box>
  </Box>
);

// 프로젝트 제작자
const UserProfile = ({ nickname, satisfaction, reviewCount, mainColor }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setfollows] = useState(426);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setfollows(isFollowing ? followers - 1 : followers + 1);

  };

  return (
    <Box sx={{ border: '1px solid #ccc', p: 2, mb: 4, borderRadius: '10px', mx: 'auto', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56, mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            {nickname}
          </Typography>
          <Typography sx={{ color: mainColor, mb: 1, fontSize: '14px' }}>
            {followers}명이 팔로우 중
          </Typography>
        </Box>
        <Button
          variant={isFollowing ? "outlined" : "contained"}
          onClick={handleFollow}
          sx={{
            backgroundColor: isFollowing ? 'white' : mainColor,
            color: isFollowing ? mainColor : 'white',
            fontWeight: 'bold',
            ml: 'auto',
            borderColor: mainColor,
            ":hover": { backgroundColor: isFollowing ? 'white' : mainColor, color: isFollowing ? mainColor : 'white', borderColor: mainColor },
          }}
        >
          {isFollowing ? '팔로우 중' : '+ 팔로우'}
        </Button>
      </Box>
      <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', mt: 1, width: '100%', pl: '58px' }}>
        <StarIcon sx={{ color: mainColor, fontSize: '20px', mr: 0.5 }} />
        만족도 {satisfaction} ({reviewCount}개)
      </Typography>
      <Button
        variant="outlined"
        sx={{ color: mainColor, borderColor: mainColor, ":hover": { borderColor: mainColor }, width: '100%', mt: 2 }}
      >
        문의하기
      </Button>
    </Box>
  );
};
//프로젝트 상세 내용
const ProjectSection = ({ id, title, children }) => (
  <Element name={id} className="element">
    <Box sx={{ mb: 8 }}>
      <Typography variant="h2" sx={{ fontSize: '20px', mb: 2, fontWeight: 'bold' }}>{title}</Typography>
      <Box>{children}</Box>
    </Box>
  </Element>
);
//스크롤 간격 등
const scrollToSection = (section) => {
  scroller.scrollTo(section, {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset: -128,
  });
};

//스크롤 기능
const ProjectScroll = ({ mainColor, sections }) => (
  <Sticky enabled={true} top={64} innerZ={1000} activeClass="sticky">
    <Box sx={{ mb: 4, backgroundColor: 'white', padding: '8px 0' }}>
      {sections.map(section => (
        <Button key={section.id} onClick={() => scrollToSection(section.id)} sx={{ border: `1px solid ${mainColor}`, borderRadius: '18px', color: mainColor, padding: '4px 8px', mr: '10px' }}>
          {section.label}
        </Button>
      ))}
    </Box>
  </Sticky>
);
//소개 내용
const IntroContent = () => (
  <Box>
    <p>모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다. 국가안전보장에 관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에 앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다.</p>
    <p>모든 국민은 학문과 예술의 자유를 가진다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다.</p>
    <p>사법권은 법관으로 구성된 법원에 속한다. 대법원장은 국회의 동의를 얻어 대통령이 임명한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.</p>
    <p>모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로 정한다. 의무교육은 무상으로 한다. 국가는 모성의 보호를 위하여 노력하여야 한다. 대통령·국무총리·국무위원·행정각부의 장·헌법재판소 재판관·법관·중앙선거관리위원회 위원·감사원장·감사위원 기타 법률이 정한 공무원이 그 직무집행에 있어서 헌법이나 법률을 위배한 때에는 국회는 탄핵의 소추를 의결할 수 있다.</p>
    <p>정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.</p>
    <p>대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 제3항의 승인을 얻지 못한 때에는 그 처분 또는 명령은 그때부터 효력을 상실한다. 이 경우 그 명령에 의하여 개정 또는 폐지되었던 법률은 그 명령이 승인을 얻지 못한 때부터 당연히 효력을 회복한다.</p>
    <p>대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다. 모든 국민은 종교의 자유를 가진다. 일반사면을 명하려면 국회의 동의를 얻어야 한다.</p>

  </Box>
);
//예산 내용
const BudgetContent = () => (
  <Box>
    <p>국무총리는 대통령을 보좌하며, 행정에 관하여 대통령의 명을 받아 행정각부를 통할한다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다.</p>
    <p>국가안전보장에 관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에 앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다.</p>
  </Box>
);
//일정 내용
const ScheduleContent = () => (
  <Box>
    <p>모든 국민은 종교의 자유를 가진다. 의무교육은 무상으로 한다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다.</p>
    <p>국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다. 모든 국민은 통신의 비밀을 침해받지 아니한다.</p>
    <p>법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다. 헌법개정안은 국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의 투표와 투표자 과반수의 찬성을 얻어야 한다.</p>
    <p>제2항과 제3항의 처분에 대하여는 법원에 제소할 수 없다. 법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여 심판한다. 전직대통령의 신분과 예우에 관하여는 법률로 정한다.</p>
    <p>모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다. 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다.</p>


  </Box>
);
//창작자 소개 내용
const CreatorContent = () => (
  <Box>
    <p>감사원은 세입·세출의 결산을 매년 검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다.</p>
    <p>대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다. 형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다.</p>

  </Box>
);
// 신뢰와 안전 내용
const TrustContent = () => (
  <Box>
    <Typography sx={{ fontWeight: 'bold', mb: 1 }}>크라우드 펀딩에 대한 안내</Typography>
    <Typography sx={{ mb: 2 }}>
      <span style={{ fontWeight: 'bold' }}>후원은 구매가 아닌 창의적인 계획에 자금을 지원하는 일입니다.</span><br />
      전자상거래법상 통신판매는 소비자의 청약 전 규격, 제조연월일 등 구체적인 상품정보가 제공 가능한 것을 대상으로 합니다. 따라서 텀블벅에서의 후원은 통신판매에 해당하지 않고, 전자상거래법 및 소비자보호규정(수령 후 7일 내 청약철회 등)이 적용되지 않습니다.
    </Typography>
    <Typography sx={{ fontWeight: 'bold', mb: 1 }}>프로젝트는 계획과 달리 진행될 수 있습니다.</Typography>
    <Typography>
      예상을 뛰어넘는 멋진 결과가 나올 수 있지만 진행 과정에서 계획이 지연, 변경되거나 무산될 수도 있습니다. 본 프로젝트를 완수할 책임과 권리는 창작자에게 있습니다.
    </Typography>
  </Box>
);

const App = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(326);
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterOption, setFilterOption] = useState('all');



  useEffect(() => {
    // location.state가 null이 아니고, selectedTab이 undefined가 아니면 해당 값으로 설정하고, 그렇지 않으면 기본값 0으로 설정
    const initialTab = location.state && location.state.selectedTab !== undefined ? location.state.selectedTab : 0;
    setSelectedTab(initialTab);
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterOptionChange = (event) => {
    setFilterOption(event.target.value);
  };

  const sections = [
    { id: 'intro', label: '소개', content: <IntroContent /> },
    { id: 'budget', label: '예산', content: <BudgetContent /> },
    { id: 'schedule', label: '일정', content: <ScheduleContent /> },
    { id: 'creator', label: '창작자 소개', content: <CreatorContent /> },
    { id: 'trust', label: '신뢰와 안전', content: <TrustContent /> },
  ];

  const handleDonateClick = () => {
    navigate('/funding');
  };

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', maxWidth: '480px', m: '0 auto', p: 3, paddingTop: '64px' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} textColor="black" sx={{ mb: 4, justifyContent: 'center' }} TabIndicatorProps={{ style: { background: mainColor, height: 3 } }}>
        <Tab label="프로젝트 스토리" sx={{ flexGrow: 1 }} />
        <Tab label="공지사항" sx={{ flexGrow: 1 }} />
        <Tab label="커뮤니티" sx={{ flexGrow: 1 }} />
        <Tab label="후기" sx={{ flexGrow: 1 }} />
      </Tabs>
      {selectedTab === 0 && (
        <>
          <ProjectImage />
          <ProjectHeader
            title="투샷 에스프레소를 버튼 하나로 만드는 51mm 휴대용 에스프레소 머신"
            description="캠핑, 여행, 출장에서 신선한 투샷 에스프레소를 버튼 하나로 손쉽게 만들어주는 에스프레소 머신. 저가는 물론 공압으로 기존 추출보다 많은 양을 추출하며 클린한 기능"
            participants="109"
            goalAmount="3,994,000"
            likes={likes}
            shares="18"
            mainColor={mainColor}
            subColor4={subColor4}
            handleLike={handleLike}
            isLiked={isLiked}
            remainingDays="8"
            achievementRate="768"
          />
          <UserProfile
            nickname="사용자 닉네임"
            followers="357"
            satisfaction="5.0"
            reviewCount="10"
            mainColor={mainColor}
          />

          <Box>
            <ProjectScroll mainColor={mainColor} sections={sections} />
            {sections.map(section => (
              <ProjectSection key={section.id} id={section.id} title={section.label}>
                {section.content}
              </ProjectSection>
            ))}
            <Button
              variant="contained"
              // onClick={}
              onClick={handleDonateClick}
              sx={{
                backgroundColor: mainColor,
                padding: '15px',
                color: 'white',
                fontWeight: 'bold',
                mb: 1,
                width: '100%',
                fontSize: '18px',
                ":hover": { backgroundColor: mainColor, color: 'white' }
              }}
            >
              프로젝트 후원하기
            </Button>
          </Box>
        </>
      )}
      {selectedTab === 1 && (
        <>
          <Announcements
            mainColor={mainColor}
            subColor4={subColor4}
            sortOrder={sortOrder}
            handleSortOrderChange={handleSortOrderChange} />
        </>
      )}
      {selectedTab === 2 && (
        <>
          <Community
            mainColor={mainColor}
            subColor4={subColor4}
            sortOrder={sortOrder}
            handleSortOrderChange={handleSortOrderChange} />
        </>
      )}
      {selectedTab === 3 && (
        <Reviews
          mainColor={mainColor}
          sortOrder={sortOrder}
          filterOption={filterOption}
          handleSortOrderChange={handleSortOrderChange}
          handleFilterOptionChange={handleFilterOptionChange} />
      )}
    </Box>
  );
};

export default App;
