import React from 'react';
import { Typography, Button, Box, FormControl, Select, MenuItem } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';

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

const rewardOptions = [
    { value: '', label: '참여한 리워드 선택' },
    { value: '리워드 1', label: '리워드 1' },
    { value: '리워드 2', label: '리워드 2' },
    { value: '리워드 3', label: '리워드 3' },
];

const ReviewWrite = () => {
    const navigate = useNavigate();
    const [reviewContent, setReviewContent] = React.useState('');
    const [rewardOption, setRewardOption] = React.useState('');

    const handleChange = (e) => {
        setRewardOption(e.target.value);
    };

    const handleSubmit = () => {
        const strippedPost = reviewContent.replace(/<(.|\n)*?>/g, '').trim();

        if (strippedPost !== '') {
            alert('게시글이 등록되었습니다!');
            console.log({
                reviewContent,
                rewardOption,
            });
            setReviewContent('');
            setRewardOption('');
            navigate('/projectdetail', {
                state: { selectedTab: 3 },
            });
        } else {
            alert('내용을 입력해주세요!');
        }
    };

    const handleGoBack = () => {
        navigate('/projectdetail', {
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

                <FormControl sx={{ width : "100%" }}>
                    <Select
                        value={rewardOption}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
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
