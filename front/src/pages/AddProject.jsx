import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
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

    const location = useLocation();
    const [basicInfoSaved, setBasicInfoSaved] = useState(false); // 프로젝트 기본 정보 저장 여부 상태
    const [rewardInfoSaved, setRewardInfoSaved] = useState(false); // 리워드 정보 저장 여부 상태

    const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일 배열 상태 (이미지 첨부 시 사용되는 코드)
    const [storyContent, setStoryContent] = useState(""); // 리액트 큐일에 작성한 내용 확인 (스토리)
    const [inputs, setInputs] = useState(location.state);

    // 옵션 셀렉트 박스 이게 해시태그의 역할을 하는건지 헷갈려서 일단 id 값에 해시태그로 써놓았습니당...
    const options = [
        { title: "1인", id: "onePerson" },
        { title: "2인", id: "twoPersens" },
        { title: "3인", id: "threePersons" },
        { title: "4인", id: "fourPersons" },
        { title: "5인 이상", id: "FiveUpPersons" },
        { title: "당일치기", id: "oneday" },
        { title: "1박 2일", id: "twodays" },
    ];

    // 리워드 영역에서  한정수량 체크
    const [isLimited, setIsLimited] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsLimited(event.target.checked);
        if (!event.target.checked) {
            setValue("limitedQuantity", "");
        }
    }
    
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
export default AddProject;
