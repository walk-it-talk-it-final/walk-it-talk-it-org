import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Button,
  Box,
  TextField,
  Autocomplete,
  InputLabel,
  FormControl,
  Input,
  styled,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import "react-quill/dist/quill.snow.css";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";

const BasicInfo = ({
  formatCurrency,
  inputs,
  setInputs,
  setBasicInfoSaved,
  options,
}) => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;

  // useForm 폼 초기화
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    ref,
    reset,
    control,
  } = useForm({});

  // 미리보기 이미지를 저장할 상태
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [showPreview, setShowPreview] = useState();

  // 등록 버튼 클릭 핸들러 (프로젝트 기본 정보 버튼)
  const basicInfoSaveBtnClick = (data) => {
    alert("기본 정보 저장 완료");
    setBasicInfoSaved(true);
    console.log({ ...inputs, ...data });
    setInputs({ ...inputs, ...data }); // 들어간 값 확인
  };

  // 썸네일 업로드 이벤트 핸들러
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("img", file);

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/projects/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
        data: file,
      },
    );
    // back에서 code 200 반환하도록 추가
    if (res.data.code === 200) {
      console.log(res.data.img);
      setValue("projectThumbImg", res.data.img);
      setShowPreview(res.data.img);
    }

    // 이미지 미리보기
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        // 이것은 ... 이미지도 객체에 전달하려고 한 것인데..... 뭔가 아닌 것 같읍니다 ....
        console.log("썸네일 이미지 Base64 문자열:", base64String);
        setThumbnailPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // 썸네일 업로드 버튼
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className="basicInfo">
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
          gap: "30px",
        }}
      >
        <Typography
          variant="h4"
          color="initial"
          fontWeight="medium"
          marginTop="70px"
        >
          프로젝트 기본 정보
        </Typography>
        <Typography variant="body1" color="initial">
          프로젝트를 대표할 주요 기본 정보를 입력하세요.
        </Typography>
        <div style={{ width: "100%" }}>
          {/* 썸네일 등록 부분 추가 */}
          <Typography
            sx={{
              variant: "body1",
              color: "initial",
              fontWeight: "medium",
              mb: "2%",
            }}
          >
            프로젝트 썸네일 등록
          </Typography>
          <Typography
            sx={{
              variant: "body1",
              color: "grey",
              mb: "5%",
            }}
          >
            2MB 이하의 JPEG, JPG, PNG <br /> 파일 사이즈 : 최소 150X150 픽셀
            이상
          </Typography>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<ImageIcon />}
            sx={{
              mb: "13%",
            }}
          >
            이미지 업로드
            <VisuallyHiddenInput type="file" onChange={handleThumbnailUpload} />
          </Button>

          {/* 썸네일 미리보기 */}
          {thumbnailPreview && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginBottom: "8%",
                }}
              />
            </div>
          )}

          <TextField
            required
            {...register("projectTitle", { required: true })}
            id="projectTitle"
            label="프로젝트 제목"
            placeholder="제목 입력"
            InputLabelProps={{
              shrink: true,
              sx: {
                "&.Mui-focused": {
                  color: mainColor,
                },
              },
            }}
            sx={{
              width: "100%",
              mb: "8%",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
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
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: subColor4,
                },
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">원</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
              sx: {
                "&.Mui-focused": {
                  color: mainColor,
                },
              },
            }}
            onChange={(e) => {
              const { value } = e.target;
              setValue("projectTargetPrice", value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="projectFinishAt"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  required
                  id="projectFinishAt"
                  label="프로젝트 종료일 *"
                  disablePast // 오늘 이전의 날짜 비활성화
                  sx={{
                    width: "100%",
                    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                      color: mainColor,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
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
            >
              성인인증
            </Typography>

            <Typography
              sx={{
                variant: "body1",
                color: subColor4,
                fontWeight: "medium",
              }}
            >
              (선택사항)
            </Typography>
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
                  freeSolo
                  id="hashtag"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  onChange={(e, newValue) => {
                    const newValueSet = new Set(
                      newValue.map((option) => option.title),
                    );
                    const newOptions = [...newValueSet].map((title) => ({
                      title,
                    }));
                    field.onChange(newOptions);
                    if (
                      e.type === "change" &&
                      e.target.value.trim().endsWith(",")
                    ) {
                      setTimeout(() => {
                        e.target.value = "";
                      }, 0);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="해시태그"
                      placeholder="키워드와 반점을 같이 입력해주세요."
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value.trim().endsWith(",")) {
                          const trimmedValue = value.slice(0, -1).trim();
                          if (trimmedValue) {
                            const newData = [
                              ...field.value,
                              { title: trimmedValue },
                            ];
                            field.onChange(newData);
                            setTimeout(() => {
                              e.target.value = "";
                            }, 0);
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === ",") {
                          e.preventDefault();
                          const trimmedValue = params.inputProps.value.trim();
                          if (trimmedValue) {
                            const newData = [
                              ...field.value,
                              { title: trimmedValue },
                            ];
                            field.onChange(newData);
                            setTimeout(() => {
                              params.inputProps.onChange({
                                target: { value: "" },
                              });
                            }, 0);
                          }
                        } else if (e.key === "Enter") {
                          e.preventDefault(); // 엔터 키 기본 동작 막기
                          const trimmedValue = params.inputProps.value.trim();
                          if (trimmedValue) {
                            const newData = [
                              ...field.value,
                              { title: trimmedValue },
                            ];
                            setTimeout(() => {
                              field.onChange(newData);
                              params.inputProps.onChange({
                                target: { value: "" },
                              });
                            }, 0);
                          }
                        }
                      }}
                    />
                  )}
                  sx={{
                    width: "100%",
                    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                      color: mainColor,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: subColor4,
                      },
                  }}
                />
              )}
            />
          </Stack>
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="mainColor"
          sx={{ width: "100%", mt: "7%", height: "52px" }}
        >
          저장하기
        </Button>
      </Box>
    </div>
  );
};

export default BasicInfo;
