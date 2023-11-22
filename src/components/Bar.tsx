import rusLogo from '../assets/rus-logo.svg';
import {Status, currentSessionIdSignal, themeSignal, sidebarSignal, areFilesUploadedSignal} from '../App';
import {Sidebar} from './Sidebar';
import {Button, IconButton, Typography, AppBar, Toolbar} from '@mui/material';
import {Stack} from '@mui/system';
import {Brightness2, FileUpload, WbSunnyOutlined} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";

export default function Bar() {

    const onMenuClick = () => {
        sidebarSignal.value = true;
    };

    const baseUrl = `https://immortal-up-weevil.ngrok-free.app`;
    const uploadUrl = baseUrl + `/upload`;

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        const filesFormdata = new FormData();
        Array.from(files ?? []).forEach(file => filesFormdata.append("logfile", file));

        areFilesUploadedSignal.value = {status: Status.RUNNING, additionalInfo: ""};

        axios({
            url: uploadUrl,
            withCredentials: false,
            method: `POST`,
            data: filesFormdata,
        }).then(res => {
            const data = res.data;
            if (data !== null) {
                areFilesUploadedSignal.value = {status: Status.SUCCESS, additionalInfo: "Upload successful!"};
            } else {
                areFilesUploadedSignal.value = {
                    status: Status.FAILURE,
                    additionalInfo: "Upload failed: No further information"
                };
            }
            currentSessionIdSignal.value = data;
        }, err => {
            areFilesUploadedSignal.value = {status: Status.FAILURE, additionalInfo: err};
        });
    };

    const onClickTheme = () => {
        const theme = themeSignal.value;
        if (theme === "dark") {
            themeSignal.value = "light";
        } else {
            themeSignal.value = "dark";
        }
    };

    let ariaLabel = "toggleDarkmode";
    let color: 'inherit' | 'info' = 'inherit';
    let icon = <WbSunnyOutlined/>;

    if (themeSignal.value === "dark") {
        ariaLabel = "toggleLightmode";
        color = "info";
        icon = <Brightness2/>;
    }

    const themeModeIconButton = (
        <IconButton
            aria-label={ariaLabel}
            onClick={onClickTheme}
            color={color}>
            {icon}
        </IconButton>
    );

    return (
        <AppBar style={{flexGrow: 1, backgroundColor: "#0F194C", overflow: 'hidden'}}>
            <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                <IconButton aria-label="menu" style={{padding: '10px'}} onClick={onMenuClick}>
                    <MenuIcon htmlColor="#FFFFFF"/>
                </IconButton>
                <div style={{flexGrow: 1, display: "flex", justifyContent: "space-between", alignContent: "left"}}>
                    <img src={rusLogo} className="logo rus" alt="RuS logo"
                         style={{height: "68px", width: "auto", padding: "5pt 1.75em"}}/>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {areFilesUploadedSignal.value.status == Status.SUCCESS ?
                        (<Stack
                            direction="row"
                            spacing={2}
                            style={{display: 'flex', justifyContent: 'center', padding: '10px'}}
                            justifyContent="flex-start">
                            <Typography noWrap>
                                Chat
                            </Typography>
                            <Typography noWrap>
                                Dashboard
                            </Typography>
                        </Stack>) : null
                    }
                    <Stack direction="row" justifyContent="flex-end">
                        <Button component="label" variant="outlined">
                            <input hidden accept="*" type="file" onChange={(e) => onUpload(e)}/>
                            <FileUpload/>
                            <Typography style={{textTransform: "none"}}>
                                Upload
                            </Typography>
                        </Button>
                        {themeModeIconButton}
                    </Stack>
                </div>
            </Toolbar>
            <Sidebar/>
        </AppBar>
    );
}
