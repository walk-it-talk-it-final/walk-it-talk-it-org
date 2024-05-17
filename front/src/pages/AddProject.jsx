import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Box, TextField, Autocomplete, InputLabel, FormControl, Input } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterOutlinedIcon from '@mui/icons-material/FilterOutlined';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';



// Quill 사용
const formats = [
    'font',
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
    'align',
    'color',
    'background',
    'size',
    'h1',
];

const AddProject = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;
    const subColor4 = theme.palette.subColor4.main;

    // useForm 폼 초기화
    const { register, handleSubmit, formState: { errors }, setValue, watch, ref, reset, control } = useForm();



    const [basicInfoSaved, setBasicInfoSaved] = useState(false);        // 프로젝트 기본 정보 저장 여부 상태
    const [rewardInfoSaved, setRewardInfoSavedSaved] = useState(false); // 리워드 정보 저장 여부 상태

    const [selectedFiles, setSelectedFiles] = useState([]);             // 선택된 파일 배열 상태 (이미지 첨부 시 사용되는 코드)
    const [storyContent, setStoryContent] = useState('');               // 리액트 큐일에 작성한 내용 확인 (스토리)


    // 등록 버튼 클릭 핸들러 (프로젝트 기본 정보 버튼)
    const basicInfoSaveBtnClick = (data) => {
        alert('기본 정보 저장 완료');
        setBasicInfoSaved(true);
        console.log(data);      // 들어간 값 확인
    };

    // 등록 버튼 클릭 핸들러 (리워드 추가 버튼)
    const rewardSaveBtnClick = (data) => {
        alert('리워드 추가 완료');
        setRewardInfoSavedSaved(true);
        console.log(data);     // 들어간 값 확인
    };


    

    const handleChange = (content) => {
        setStoryContent(content);
    };

    // 등록 버튼 클릭 핸들러 (프로젝트 등록 버튼)
    const projectSaveBtnClick = (data) => {
        alert('프로젝트 등록 완료');
        console.log('사용자가 입력한 스토리 내용:', storyContent);      // 들어간 값 확인
    }


    // 취소 버튼 클릭 핸들러
    const handleCancelButtonClick = () => {
        reset({
            rewardPrice: "",
            rewardOption: "",
            rewardNum: ""
        });
    };


    // 금액 입력 필드에 반점 추가하는 함수
    const formatCurrency = (value) => {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    // 옵션 셀렉트 박스 이게 해시태그의 역할을 하는건지 헷갈려서 일단 id 값에 해시태그로 써놓았습니당...
    const options = [
        { title: '1인', id: 'onePerson' },
        { title: '2인', id: 'twoPersens' },
        { title: '3인', id: 'threePersons' },
        { title: '4인', id: 'fourPersons' },
        { title: '5인 이상', id: 'FiveUpPersons' },
        { title: '당일치기', id: 'oneday' },
        { title: '1박 2일', id: 'twodays' },
    ]


    // 파일 선택 시 (이미지 선택)
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    // 파일 삭제 시 (이미지 삭제)
    const handleFileDelete = (fileName) => {
        const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
        setSelectedFiles(updatedFiles);
    };


    // Quill 사용
    const [values, setValues] = useState();

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                    ['image'],
                ],
            },
        };
    }, []);



    return (
        <div className='wrap' style={{ display: "block" }}>

            {/* 프로젝트 기본 정보 영역 */}
            <div className='basicInfo'>
                <Box
                    component="form"
                    p={2}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(basicInfoSaveBtnClick)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50ch",
                        gap: "30px"
                    }}
                >
                    <Typography variant="h4" color="initial" fontWeight="medium" marginTop="70px">
                        프로젝트 기본 정보
                    </Typography>
                    <Typography variant="body1" color="initial">
                        프로젝트를 대표할 주요 기본 정보를 입력하세요.
                    </Typography>
                    <div style={{ width: "100%" }}>
                        <TextField
                            required
                            {...register("projectTitle", { required: true })}
                            id="projectTitle"
                            label="프로젝트 제목"
                            placeholder="제목 입력"
                            InputLabelProps={{
                                shrink: true,
                                sx: {
                                    '&.Mui-focused': {
                                        color: mainColor,
                                    },
                                }
                            }}
                            sx={{
                                width: "100%",
                                mb: "8%",
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: subColor4,
                                },
                            }}
                        />
                        <TextField
                            required
                            {...register("projectTargetPrice", { required: true })}
                            id="projectTargetPrice"
                            label="목표 금액"
                            placeholder="목표 금액 입력"
                            sx={{
                                mb: "6%",
                                width: "100%",
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: subColor4,
                                }
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">원</InputAdornment>,
                            }}
                            InputLabelProps={{
                                shrink: true,
                                sx: {
                                    '&.Mui-focused': {
                                        color: mainColor,
                                    }
                                }
                            }}
                            onChange={(e) => {
                                const { value } = e.target;
                                setValue("projectTargetPrice", formatCurrency(value));
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                name="projectEndDate"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        required
                                        label="프로젝트 종료일 *"
                                        disablePast // 오늘 이전의 날짜 비활성화
                                        sx={{
                                            width: "100%",
                                            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                                color: mainColor,
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: subColor4,
                                            },
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        <div style={{ display: "flex", marginTop: "7%" }}>
                            <Typography
                                sx={{
                                    variant: "body1",
                                    color: "initial",
                                    fontWeight: "medium",
                                }}
                            >성인인증</Typography>

                            <Typography
                                sx={{
                                    variant: "body1",
                                    color: subColor4,
                                    fontWeight: "medium"
                                }}
                            >(선택사항)</Typography>
                        </div>
                        <FormControlLabel
                            control={<Checkbox {...register("adultVerification")} />}
                            label="19세 이상 펀딩 가능한 리워드입니다."
                        />

                        <Stack spacing={3} sx={{ width: "100%", mt: "8%" }}>
                            <Controller
                                name="hashtags"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        id="hashtag"
                                        options={options}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="상세 옵션 설정"
                                                placeholder="옵션 선택"
                                            />
                                        )}
                                        onChange={(_, data) => field.onChange(data)}
                                        sx={{
                                            width: "100%",
                                            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                                color: 'mainColor',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'subColor4',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                    </div>
                    <Button type="submit" variant="outlined" color="mainColor" sx={{ width: "100%", mt: "7%", height: "52px" }} >저장하기</Button>
                </Box>
            </div>



            {/* 리워드 추가 영역 */}
            {basicInfoSaved && (
                <div className='rewardInfo' style={{ marginTop: "15%" }}>
                    <Box
                        component="form"
                        p={2}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(rewardSaveBtnClick)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50ch",
                            gap: "30px",
                            mt: "10%"
                        }}
                    >
                        <Typography variant="h4" color="initial" fontWeight="medium" >
                            리워드 추가
                        </Typography>
                        <div style={{ width: "100%" }}>
                            <TextField
                                required
                                {...register("rewardPrice", { required: true })}
                                id="rewardPrice"
                                label="금액"
                                placeholder="리워드 금액 입력"
                                sx={{
                                    mb: "8%",
                                    width: "100%",
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: subColor4,
                                    }
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">원</InputAdornment>,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        '&.Mui-focused': {
                                            color: mainColor,
                                        }
                                    }
                                }}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setValue("rewardPrice", formatCurrency(value));
                                }}
                            />
                            <TextField
                                required
                                {...register("rewardOption", { required: true })}
                                id="rewardOption"
                                label="상세설명"
                                multiline
                                rows={3}
                                placeholder="제공하는 리워드가 무엇인지 간략하게 제시해주세요."
                                sx={{
                                    mb: "8%",
                                    width: "100%",
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: subColor4,
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        '&.Mui-focused': {
                                            color: mainColor,
                                        }
                                    }
                                }}
                            />

                            <Stack spacing={3} sx={{ width: "100%", mt: "2%" }}>
                                <Controller
                                    name="hashtags"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            multiple
                                            id="hashtag"
                                            options={options}
                                            getOptionLabel={(option) => option.title}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="상세 옵션 설정"
                                                    placeholder="옵션 선택"
                                                />
                                            )}
                                            onChange={(_, data) => field.onChange(data)}
                                            sx={{
                                                width: "100%",
                                                '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                                    color: 'mainColor',
                                                },
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'subColor4',
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                            <TextField
                                required
                                {...register("rewardNum", { required: true })}
                                id="rewardNum"          // 이 프로젝트는 리워드 개수가 여행갈 사람 인원이라고 생각을 해서 일단 id 값에 rewardNum 이라고 해두었씁니다 
                                label="인원 수"
                                placeholder="인원 수 입력"
                                sx={{
                                    mt:"8%",
                                    mb: "8%",
                                    width: "100%",
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: subColor4,
                                    }
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">명</InputAdornment>,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        '&.Mui-focused': {
                                            color: mainColor,
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className="buttonWrap" style={{ display: "flex", gap: "20px" }}>
                            <Button type="button" variant="outlined" color="subColor4" sx={{ width: "100%", height: "52px" }} onClick={handleCancelButtonClick} >취소</Button>
                            <Button type="submit" variant="contained" color="mainColor" sx={{ width: "100%", height: "52px", color: "white" }} >추가</Button>
                        </div>
                    </Box>
                </div >
            )}


            {/* 프로젝트 스토리 작성 영역 */}
            {rewardInfoSaved && (
                <div className='projectStoryWrap' style={{ marginTop: "20%" }}>
                    <Box
                        component="form"
                        p={2}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(projectSaveBtnClick)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50ch",
                            gap: "30px",
                            mt: "10%"
                        }}
                    >
                        <Typography variant="h4" color="initial" fontWeight="medium">
                            스토리 작성
                        </Typography>
                        <Typography variant="body1" color="initial" >
                            생성자님의 프로젝트를 소개해보세요. 스토리에는 생성자님의 진심과 목소리가 잘 녹여질 수 있도록 명확하고, 솔직하게, 친근한 어투로 작성하세요.
                        </Typography>
                        <div style={{ width: "100%" }}>
                            <Typography
                                sx={{
                                    fontSize: "17px",
                                    color: "initial",
                                    fontWeight: "medium"
                                }}
                            >소개 영상 · 사진 등록 * </Typography>
                            <Typography
                                sx={{
                                    variant: "body1",
                                    color: subColor4,
                                }}
                            >프로젝트 페이지 상단에 노출될 영상 또는 사진을 올려주세요.</Typography>
                            <label htmlFor="file-upload">
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={handleFileSelect}
                                    style={{ display: "none" }}
                                    multiple // 다중 파일 선택 가능하도록 설정
                                />
                                <Button
                                    variant="contained"
                                    component="span"
                                    color="subColor4"
                                    sx={{ mb: "6%", mt: "5%", width: "50%", color: "white" }}
                                    startIcon={<FilterOutlinedIcon />}
                                >
                                    등록하기
                                </Button>
                            </label>
                            {selectedFiles.map(file => (
                                <div key={file.name} style={{ display: 'flex', alignItems: 'center', mb: '8px' }}>
                                    <Typography variant="body1" color="initial">
                                        선택된 파일: {file.name}
                                    </Typography>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        onClick={() => handleFileDelete(file.name)}
                                        sx={{ minWidth: 'auto', p: 0, ml: 1 }}
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div style={{ width: "100%" }}>
                            <Typography
                                sx={{
                                    fontSize: "17px",
                                    color: "initial",
                                    fontWeight: "medium"
                                }}
                            >프로젝트 스토리 * </Typography>
                            <Typography
                                sx={{
                                    variant: "body1",
                                    color: subColor4,
                                    mb: "5%"
                                }}
                            >진정성 있고 매력적인 스토리로 서포터의 마음을 움직여볼까요? </Typography>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={storyContent}
                                onChange={handleChange}
                                style={{ height: '500px' }}
                                placeholder={
                                    `프로젝트 스토리를 작성해주세요. 😆`
                                }
                            />
                        </div>

                        <Button type="submit" variant="contained" color="mainColor" sx={{ width: "100%", height: "52px", color: "white", mt: "15%" }} onClick={projectSaveBtnClick} >프로젝트 등록하기</Button>
                    </Box>
                </div >
            )}

        </div >
    );
}
export default AddProject;