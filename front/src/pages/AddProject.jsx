import React, { useEffect, useMemo, useState } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BasicInfo from "../components/projects/BasicInfo";
import RewardAdd from "../components/projects/RewardAdd";
import ProjectStory from "../components/projects/ProjectStory";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BasicInfo from "../components/projects/BasicInfo";
import RewardAdd from "../components/projects/RewardAdd";
import ProjectStory from "../components/projects/ProjectStory";

const AddProject = () => {
  const theme = useTheme();
  const mainColor = theme.palette.mainColor.main;
  const subColor4 = theme.palette.subColor4.main;
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
<<<<<<< HEAD
=======

  const location = useLocation();
  const [basicInfoSaved, setBasicInfoSaved] = useState(false); // 프로젝트 기본 정보 저장 여부 상태
  const [rewardInfoSaved, setRewardInfoSaved] = useState(false); // 리워드 정보 저장 여부 상태
  const [inputs, setInputs] = useState(location.state);
>>>>>>> c04c681d3b080d05658118a39ab8f3c93262bd9b

  const location = useLocation();
  const [basicInfoSaved, setBasicInfoSaved] = useState(false); // 프로젝트 기본 정보 저장 여부 상태
  const [rewardInfoSaved, setRewardInfoSaved] = useState(false); // 리워드 정보 저장 여부 상태
  const [inputs, setInputs] = useState(location.state);

<<<<<<< HEAD
  const location = useLocation();
  const [basicInfoSaved, setBasicInfoSaved] = useState(false); // 프로젝트 기본 정보 저장 여부 상태
  const [rewardInfoSaved, setRewardInfoSaved] = useState(false); // 리워드 정보 저장 여부 상태

  const options = [];
=======
  const options = [

  ];
>>>>>>> c04c681d3b080d05658118a39ab8f3c93262bd9b

  // 금액 입력 필드에 반점 추가하는 함수
  const formatCurrency = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // 금액 입력 필드에 반점 추가하는 함수
  const formatCurrency = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="wrap" style={{ display: "block" }}>
      {/* 프로젝트 기본 정보 영역 */}
      {!basicInfoSaved && (
        <BasicInfo
          formatCurrency={formatCurrency}
          inputs={inputs}
          setInputs={setInputs}
          setBasicInfoSaved={setBasicInfoSaved}
          options={options}
        />
      )}
  return (
    <div className="wrap" style={{ display: "block" }}>
      {/* 프로젝트 기본 정보 영역 */}
      {!basicInfoSaved && (
        <BasicInfo
          formatCurrency={formatCurrency}
          inputs={inputs}
          setInputs={setInputs}
          setBasicInfoSaved={setBasicInfoSaved}
          options={options}
        />
      )}

      {/* 리워드 추가 영역 */}
      {basicInfoSaved && !rewardInfoSaved && (
        <RewardAdd
          formatCurrency={formatCurrency}
          inputs={inputs}
          setInputs={setInputs}
          setRewardInfoSaved={setRewardInfoSaved}
          options={options}
        />
      )}
      {/* 리워드 추가 영역 */}
      {basicInfoSaved && !rewardInfoSaved && (
        <RewardAdd
          formatCurrency={formatCurrency}
          inputs={inputs}
          setInputs={setInputs}
          setRewardInfoSaved={setRewardInfoSaved}
          options={options}
        />
      )}

      {/* 프로젝트 스토리 작성 영역 */}
      {rewardInfoSaved && (
        <ProjectStory
          formatCurrency={formatCurrency}
          inputs={inputs}
          setInputs={setInputs}
          options={options}
        />
      )}
    </div>
  );
};
      {/* 프로젝트 스토리 작성 영역 */}
      {rewardInfoSaved && (
        <ProjectStory
          formatCurrency={formatCurrency}
          inputs={inputs}
          setInputs={setInputs}
          options={options}
        />
      )}
    </div>
  );
};
export default AddProject;

