import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, FormControl, Select, MenuItem } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
];

const ReviewWrite = ({ inputs, setInputs }) => {
    const navigate = useNavigate();
    const [reviewContent, setReviewContent] = useState('');
    const [rewardOptions, setRewardOptions] = useState([]);
    const [rewardOption, setRewardOption] = useState('');

    const params = useParams();
    const projectId = params.id;

    useEffect(() => {
        const fetchRewardOptions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/rewards/${projectId}`);
                const rewardOptionsData = response.data.payload; // 리워드 옵션 데이터
                const formattedRewardOptions = rewardOptionsData.map(option => ({
                    value: option.id,
                    label: option.rewardOption,
                }));
                setRewardOptions(formattedRewardOptions);

            } catch (error) {
                console.error('Error fetching reward options:', error);
            }
        };

        fetchRewardOptions();
    }, []);

    const handleChange = (e) => {
        setRewardOption(e.target.value);
    };

    const handleSubmit = async () => {
        const strippedPost = reviewContent.replace(/<(.|\n)*?>/g, '').trim();

        if (strippedPost !== '') {
            console.log({
                ...inputs,
                rewardOption, // 리워드 옵션 출력
                reviewContent, // 리뷰 내용 출력
            });
            try {
                // 서버로 데이터 전송
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/projects/${projectId}/reviews`,
                    {
                        ...inputs,
                        rewardOption,
                        reviewContent
                    }, // 각각의 내용 전송
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    },
                );
                alert('프로젝트 후기가 등록되었습니다!');
                console.log(response.data);
                navigate(`/projects/${projectId}`, {
                    // selectedTab 스테이트를 넘겨준다.
                    state: { selectedTab: 3 },
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            alert('내용을 입력해주세요!');
        }
    };

    const handleGoBack = () => {
        navigate(`/projects/${projectId}`, {
            state: { selectedTab: 3 },
        });
    };

    return (
        <div style={{ marginTop: '3%' }}>
            <Box
                component="div"
                p={2}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50ch',
                    gap: '30px',
                    mt: '10%',
                }}
            >
                <Button
                    variant="outlined"
                    color="mainColor"
                    sx={{ width: '10%', height: '30px', color: 'mainColor' }}
                    onClick={handleGoBack}
                >
                    <ChevronLeftIcon />
                </Button>
                <Typography variant="h4" color="initial" fontWeight="medium">
                    후기 작성
                </Typography>
                <Typography variant="body1" color="initial">
                    이용 후기를 남겨주시면 더 나은 펀딩 서비스를 제공하는 데 큰 도움이 됩니다. 감사합니다😊
                </Typography>

                <FormControl sx={{ width: "100%" }}>
                    <Select
                        value={rewardOption}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        placeholder='참여한 리워드를 선택해주세요'
                    >
                        <MenuItem value="">
                            참여한 리워드를 선택해주세요
                        </MenuItem>
                        {rewardOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={reviewContent}
                    onChange={setReviewContent}
                    style={{ height: '500px', marginBottom: 90 }}
                    placeholder={`자유롭게 작성해주세요! 😆`}
                />
                <Button
                    variant="contained"
                    color="mainColor"
                    onClick={handleSubmit}
                    sx={{ width: '100%', height: '52px', color: 'white' }}
                >
                    후기 등록하기
                </Button>
            </Box>
        </div>
    );
};

export default ReviewWrite; 