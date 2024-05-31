import React from 'react';
import { Typography, Button, Box } from '@mui/material';
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

const CommuPostWrite = () => {
    const navigate = useNavigate();
    const [commuContent, setCommuContent] = React.useState('');

    const handleSubmit = () => {
        const strippedPost = commuContent.replace(/<(.|\n)*?>/g, '').trim();

        if (strippedPost !== '') {
            alert('게시글이 등록되었습니다!');
            console.log({
                commuContent,
            });
            setCommuContent('');
            navigate('/projectdetail', {
                // selectedTab 스테이트를 넘겨준다.
                state: { selectedTab: 2 },
            })
        } else {
            alert('내용을 입력해주세요!');
        }
    };

    const handleGoBack = () => {
        navigate('/projectdetail', {
            // selectedTab 스테이트를 넘겨준다.
            state: { selectedTab: 2 },
        })
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
                    onClick={() => handleGoBack()}
                >
                    <ChevronLeftIcon />
                </Button>
                <Typography variant="h4" color="initial" fontWeight="medium">
                    커뮤니티 게시글 작성
                </Typography>
                <Typography variant="body1" color="initial">
                    커뮤니티 글 작성 시에는 솔직하고 가볍게 작성하되, 지나친 욕설이나 비방은 지양해주세요 !
                </Typography>

                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={commuContent}
                    onChange={setCommuContent}
                    style={{ height: '500px', marginBottom: 90 }}
                    placeholder={`자유롭게 작성해주세요! 😆`}
                />
                <Button
                    variant="contained"
                    color="mainColor"
                    onClick={handleSubmit}
                    sx={{ width: '100%', height: '52px', color: 'white' }}
                >
                    게시글 등록하기
                </Button>
            </Box>
        </div>
    );
};

export default CommuPostWrite; 