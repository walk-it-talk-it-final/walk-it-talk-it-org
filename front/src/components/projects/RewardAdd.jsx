import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";

const RewardAdd = ({
  formatCurrency,
  inputs,
  setInputs,
  setRewardInfoSaved,
  options,
}) => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;

  const [isLimited, setIsLimited] = useState(false);
  const [rewards, setRewards] = useState([]);

  const handleCheckboxChange = (e) => {
    setIsLimited(e.target.checked);
    if (!e.target.checked) {
      setValue("limitedQuantity", "");
    }
  };

  const rewardSaveBtnClick = (data) => {
    alert("리워드 추가 완료");
    console.log([...rewards, data]); // 들어간 값 확인
    setRewards([...rewards, data]);
    setInputs({ ...inputs, rewards: [...rewards, data] });
    reset();
  };

  const rewardRegisterBtnClick = (data) => {
    console.log(inputs);
    alert("리워드 등록 완료");
    setRewardInfoSaved(true);
    // console.log(data); // 들어간 값 확인
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      rewardPrice: "1000000",
      rewardOption: "1인 패키지",
    },
  });

  return (
    <div className="rewardInfo" style={{ marginTop: "20%", marginBottom : 70}}>
      <Typography variant="h4" color="initial" fontWeight="medium">
        리워드 추가
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50ch",
          gap: "30px",
          mt: "10%",
          border: "0.5px solid grey",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <Typography variant="body1" color="subColor4" fontWeight="medium">
          🍀 여기에 리워드가 추가됩니다. 🍀
        </Typography>
        {rewards.map((reward, index) => (
          <Box
            key={index}
            sx={{
              padding: "16px",
              border: "0.2px solid lightgrey",
              borderRadius: "3px",
              marginBottom: "5px",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16) ",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <Typography
                variant="body1"
                color="initial"
                fontWeight="medium"
                sx={{
                  background:
                    "linear-gradient(to top, #bfffa1  40%, transparent 40%)",
                  marginBottom: "10px",
                }}
              >
                리워드 금액
              </Typography>

              <Typography variant="body1" color="initial" fontWeight="medium">
                : {reward.rewardPrice}
              </Typography>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Typography
                variant="body1"
                color="initial"
                fontWeight="medium"
                sx={{
                  background:
                    "linear-gradient(to top, #bfffa1  40%, transparent 40%)",
                  marginBottom: "10px",
                }}
              >
                리워드 상세 내용
              </Typography>

              <Typography variant="body1" color="initial" fontWeight="medium">
                : {reward.rewardOption}
              </Typography>
            </div>

            {reward.limitedVerification && (
              <div style={{ display: "flex", gap: "10px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontWeight="medium"
                  sx={{
                    background:
                      "linear-gradient(to top, #bfffa1  40%, transparent 40%)",
                  }}
                >
                  한정 수량
                </Typography>

                <Typography variant="body1" color="initial" fontWeight="medium">
                  : {reward.limitedQuantity}
                </Typography>
              </div>
            )}
          </Box>
        ))}
      </Box>
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
          mt: "10%",
          border: "0.5px solid grey",
          borderRadius: "10px",
          height: "100%",
        }}
      >
        <TextField
          required
          {...register("rewardPrice", { required: true })}
          id="rewardPrice"
          label="리워드 금액"
          placeholder="리워드 금액 입력"
          sx={{
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
            setValue("rewardPrice", value);
          }}
        />
        <TextField
          required
          {...register("rewardOption", { required: true })}
          id="rewardOption"
          label="리워드 상세 내용"
          placeholder="리워드 상세 내용"
          multiline
          rows={4}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: subColor4,
              },
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              "&.Mui-focused": {
                color: mainColor,
              },
            },
          }}
        />
        <div style={{ display: "block" }}>
          <Typography
            sx={{
              variant: "body1",
              color: "initial",
              fontWeight: "medium",
            }}
          >
            한정 리워드 여부
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                {...register("limitedVerification")}
                checked={isLimited}
                onChange={handleCheckboxChange}
              />
            }
            label="수량에 제한이 있는 리워드입니다."
          />
          <TextField
            required
            {...register("limitedQuantity", { required: isLimited })}
            id="limitedQuantity"
            label="수량 입력"
            type="number"
            placeholder="수량을 입력하세요"
            disabled={!isLimited}
            sx={{
              mt: "6%",
              width: "100%",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: subColor4,
                },
            }}
            InputLabelProps={{
              shrink: true,
              sx: {
                "&.Mui-focused": {
                  color: mainColor,
                },
              },
            }}
            inputProps={{
              min: 1,
            }}
          />
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="mainColor"
          sx={{ width: "100%", height: "52px" }}
        >
          리워드 추가하기
        </Button>
      </Box>

      <Button
        type="button"
        variant="contained"
        color="mainColor"
        sx={{ width: "100%", height: "52px", color: "white", mt: "10%" }}
        onClick={rewardRegisterBtnClick}
      >
        리워드 등록하기
      </Button>
    </div>
  );
};

export default RewardAdd;
