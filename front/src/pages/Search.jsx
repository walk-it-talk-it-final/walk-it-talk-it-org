// Search
import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@emotion/react";
import ProjectCard from "../components/layouts/ProjectCard";
import searchIMG from "../assets/searchIMG.png";

const Search = () => {
  const theme = useTheme(); // 테마 접근
  const mainColor = theme.palette.mainColor.main; // mainColor 가져오기
  const subColor1 = theme.palette.subColor1.main;

  // const [searchParams] = useSearchParams();
  // const hashtag = searchParams.get("hashtag");

  const navigate = useNavigate();
  const [projects, setProjects] = useState();

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearchTerms, setRecentSearchTerms] = useState([]);
  const popularSearchTerms = [
    "자유여행",
    "유럽",
    "동남아",
    "영국",
    "배낭여행",
    "국내 여행",
    "일본",
    "하와이",
    "캘리포니아",
    "미국",
  ];

  const goToPrevPage = () => {
    navigate(-1);
  };

  // 검색 api 호출
  const getProjects = useCallback(async () => {
    if (searchTerm.trim()) {
      try {
        console.log(searchTerm);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects`,
          {
            params: { hashtag: searchTerm }, // 쿼리 파라미터로 hashtag 전달
          },
        );
        setProjects(res.data.payload);
        setShowResults(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("searchTerm is empty");
    }
  }, [searchTerm]); // 해시태그가 변경될 때만 함수가 재생성

  // 최근 검색어 가져오기
  useEffect(() => {
    const storedSearchTerms = localStorage.getItem("recentSearchTerms");
    if (storedSearchTerms) {
      setRecentSearchTerms(JSON.parse(storedSearchTerms));
    }
  }, []);

  // 검색 처리
  const handleSearch = (event) => {
    event.preventDefault();
    // 최근 검색어 목록 업데이트
    if (searchTerm.trim()) {
      let updatedSearchTerms = recentSearchTerms.filter(
        (term) => term !== searchTerm,
      );
      updatedSearchTerms = [searchTerm, ...updatedSearchTerms];
      setRecentSearchTerms(updatedSearchTerms);
      localStorage.setItem(
        "recentSearchTerms",
        JSON.stringify(updatedSearchTerms),
      );
      getProjects();
      // setShowResults((prevShowResults) => !prevShowResults);
      setShowResults(true);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      getProjects();
    }
  }, [searchTerm, getProjects]);

  // 최근 검색어 클릭하여 재검색
  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    let updatedSearchTerms = recentSearchTerms.filter((t) => t !== term);
    updatedSearchTerms = [term, ...updatedSearchTerms];
    setRecentSearchTerms(updatedSearchTerms);
    localStorage.setItem(
      "recentSearchTerms",
      JSON.stringify(updatedSearchTerms),
    );
  };

  // 검색 기록 삭제
  const clearRecentSearches = () => {
    setRecentSearchTerms([]);
    localStorage.removeItem("recentSearchTerms");
  };

  return (
    <div style={{minHeight: 700}}>
      {/* 검색바 */}
      <Box
        component="form"
        display="flex"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력해주세요."
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />
        <IconButton type="submit">
          <SearchIcon
            sx={{
              color: mainColor,
              cursor: "pointer",
            }}
          />
        </IconButton>
        <IconButton onClick={goToPrevPage} sx={{ fontSize: "24px" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider component="div" role="presentation" flexItem />
      {!showResults ? (
        <Box sx={{ width: "100%" }}>
          {/* 최근 검색어 */}
          {recentSearchTerms.length > 0 && (
            <Box
              sx={{
                margin: "20px auto",
                padding: "0 20px",
                maxWidth: "600px",
                textAlign: "left",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  최근 검색어
                </Typography>
                <Button
                  onClick={clearRecentSearches}
                  sx={{
                    color: mainColor,
                    float: "right",
                    textDecoration: "underline",
                  }}
                >
                  전체삭제
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {recentSearchTerms.map((term, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "4px",
                      backgroundColor: subColor1,
                      padding: "5px 0 5px 10px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: mainColor, paddingTop: "3px" }}
                    >
                      {term}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRecentSearchTerms(
                          recentSearchTerms.filter((_, i) => i !== index),
                        );
                      }}
                      sx={{ marginLeft: "5px" }}
                    >
                      <CloseIcon fontSize="small" sx={{ color: mainColor }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          <Divider component="div" role="presentation" flexItem />
          {/* 인기 검색어 */}
          <Box
            sx={{
              margin: "20px auto",
              padding: "0 20px",
              maxWidth: "600px",
              textAlign: "left",
            }}
          >
            <img src={searchIMG} style={{marginTop: 40, width: 320, height: 320}}></img>
          </Box>
        </Box>
      ) : (
        // 검색 결과 표시
        // 한 줄에 두 개씩 오게 만들고 싶은데 안됨..
        <div
          className="wrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="form"
            p={2}
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              // flexDirection: "column",
              width: "50ch",
              gap: "30px",
              justifyContent: "space-between",
            }}
          >
            {projects &&
              projects.map((project) => <ProjectCard project={project} />)}
          </Box>
        </div>
      )}
    </div>
  );
};

export default Search;
