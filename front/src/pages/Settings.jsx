import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Typography, Box, Button, TextField } from "@mui/material";

const Settings = () => {
    const theme = useTheme();
    const mainColor = theme.palette.mainColor.main;

    // 원래 지정한 사진으로 초기값 설정 
    const [profileImage, setProfileImage] = useState("https://i.namu.wiki/i/-vq_BrSekQ9__KSOwEbm1Hkb4QG4rDT-VSIDPjMtplPgaZNB8iLhD-xDki_QLocTfQPqsoy2b97-a5RLkdGHjcSscFuioHXLWb7OEsyX0u73rma5QkCySrJlycPzlgAELgzWOBcsugC-19xaqXTUOQ.webp");
    const [nick, setNick] = useState("우사기"); // 초기값으로 기존 닉네임 설정

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlenickChange = (event) => {
        setNick(event.target.value);
    };

    const handleSubmit = () => {
        alert('프로필이 저장되었습니다.');
        // 변경된 값을 콘솔에 출력 (확인)
        console.log('Profile Image:', profileImage);
        console.log('nick:', nick);
    };

    return (
        <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
            <Box
                component="form"
                p={2}
                noValidate
                autoComplete="off"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50ch",
                    gap: "30px",
                }}
            >
                <div className="profileSettingsWrap" style={{ marginTop: 70, padding: 10 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
                        프로필 수정
                    </Typography>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 20 }}>
                        <Avatar
                            alt="프로필 이미지"
                            src={profileImage}
                            sx={{ width: 90, height: 90, border: "1px solid grey" }}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="outlined"
                                component="span"
                                sx={{ border: "none", ':hover': { border: "none", backgroundColor: "transparent" } }}
                            >
                                프로필 이미지 수정
                            </Button>
                        </label>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, width: "100%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold", width: "30%" }}>
                            닉네임
                        </Typography>
                        <TextField
                            variant="outlined"
                            value={nick}
                            onChange={handlenickChange}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                        />
                    </div>
                    
                    <Button 
                        variant="contained" 
                        color="mainColor" 
                        onClick={handleSubmit}
                        sx={{ marginTop: 13, width: "100%", height: 50, color:"white"}}
                    >
                        저장하기
                    </Button>
                </div>
            </Box>
        </div>
    );
}

export default Settings;
