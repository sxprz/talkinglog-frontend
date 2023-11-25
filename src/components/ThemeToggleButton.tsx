import {
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import React, {useState} from "react";
import {themeSignal} from "../App.tsx";
import {Brightness2, WbSunnyOutlined} from "@mui/icons-material";
import {styled} from "@mui/system";

const InternalDarkModeToggleButton = styled(ToggleButton)({
    "&.Mui-selected": {
        color: "white",
    },
    "&:not(.Mui-selected)": {
        color: "#0060cc",
    }
});

const InternalLightModeToggleButton = styled(ToggleButton)({
    "&.Mui-selected": {
        color: "white",
    },
    "&:not(.Mui-selected)": {
        color: "#a3c4ff",
    },
    /*border: '1px solid #000', // change to your desired color
    borderRadius: '4px', // change to your desired radius
    ':focus': {
        borderColor: '#f00', // change to your desired color
    }*/
});

const InternalThemeToggleButtonGroup = styled(ToggleButtonGroup)({
    border: '1px #357ed0',
    borderRadius: '1px'
});

export default function ThemeToggleButton() {

    const [value, setValue] = useState<'left' | 'right'>("left");

    const handleTheme = (_event: React.MouseEvent<HTMLElement>, value: 'left' | 'right') => {
        if (value !== null) {
            if (value === 'right') {
                themeSignal.value = "dark";
            } else {
                themeSignal.value = "light";
            }
            setValue(() => value);
        }
    };

    return (
        <InternalThemeToggleButtonGroup
            value={value}
            exclusive
            onChange={handleTheme}
            style={{marginRight: "13px"}}
            aria-label="theme"
        >
            <InternalLightModeToggleButton value="left" aria-label="light">
                <WbSunnyOutlined/>
            </InternalLightModeToggleButton>
            <InternalDarkModeToggleButton value="right" aria-label="dark">
                <Brightness2/>
            </InternalDarkModeToggleButton>
        </InternalThemeToggleButtonGroup>
    );
}