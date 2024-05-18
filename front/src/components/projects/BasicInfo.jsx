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

const BasicInfo = ({ formatCurrency, maker, setBasicInfoSaved, options }) => {
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
  } = useForm();

  // 등록 버튼 클릭 핸들러 (프로젝트 기본 정보 버튼)
  const basicInfoSaveBtnClick = (data) => {
    alert("기본 정보 저장 완료");
    setBasicInfoSaved(true);
    const input = { ...maker, ...data };
    console.log(input); // 들어간 값 확인
  };

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
                    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                      color: "mainColor",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "subColor4",
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
