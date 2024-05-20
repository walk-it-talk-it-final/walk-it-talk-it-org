import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
    Typography,
    Button,
    Box,
} from "@mui/material";

const SearchList = () => {
    return (
        <div className="wrap" style={{ display: "block" }}>
            <Box
                component="form"
                p={2}
                noValidate
                autoComplete="off"
                // onSubmit={} 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50ch",
                    gap: "30px",
                }}
            >
            </Box>
        </div>
    );
}

export default SearchList;