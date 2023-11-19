import rusLogo from '../assets/rus-logo.svg';
import { Status, currentSessionIdSignal, darkModeSignal, sidebarSignal, areFilesUploadedSignal } from '../App';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from './Sidebar';
import { Button, IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import { Stack } from '@mui/system';
import { Brightness2, FileUpload, WbSunnyOutlined } from '@mui/icons-material';
import axios from "axios";

export default function Bar() {
    
    const onClick = () => {
        sidebarSignal.value = true;
    };

    const uploadUrl = `https://immortal-up-weevil.ngrok-free.app/upload`;

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        console.log(files);
        const filesFormdata = new FormData();
        Array.from(files ?? []).forEach(file => filesFormdata.append("logfile", file));
        
        areFilesUploadedSignal.value = { status: Status.RUNNING, additionalInfo: "" };

        axios({
            url: uploadUrl,
            withCredentials: false, 
            method: `POST`,
            data: filesFormdata,
        }).then(res => {
            const data = res.data;
            if (data !== null) {
                areFilesUploadedSignal.value = { status: Status.SUCCESS, additionalInfo: "" };
            } else {
                areFilesUploadedSignal.value = { status: Status.FAILURE, additionalInfo: "Upload failed: No further information" };
            }
            currentSessionIdSignal.value = data;
        }, err => {
            areFilesUploadedSignal.value = { status: Status.FAILURE, additionalInfo: err };
        });
    };
    
    return (
        <AppBar sx={{ backgroundColor: "#0F194C" , overflow: 'hidden'}}>
            <Toolbar>
                <IconButton aria-label="menu" sx={{ p: '10px' }} onClick={onClick}>
                    <MenuIcon htmlColor="#FFFFFF"/>
                </IconButton>
                <img src={rusLogo} className="logo rus align-left" alt="RuS logo" style={{ height: "68px", width: "auto", padding: "5pt 1.75em" }}/>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {areFilesUploadedSignal.value.status == Status.SUCCESS ?
                        (<Stack
                            direction="row"
                            spacing={2}
                            sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                            justifyContent="flex-start">
                                <Typography noWrap>
                                    Chat
                                </Typography>
                                <Typography noWrap>
                                    Dashboard
                                </Typography>
                        </Stack>) : null
                    }
                    <Stack direction="row"
                        justifyContent="flex-end">
                        <Button component="label" variant="outlined">
                            <input hidden accept="*" type="file" onChange={(e) => onUpload(e)} />
                            <FileUpload />
                            <Typography sx={{ textTransform: "none" }}>
                                Upload
                            </Typography>
                        </Button>
                        { darkModeSignal.value ?
                            <IconButton aria-label="toggleLightmode"
                                        onClick={() => darkModeSignal.value = false}
                                        color='inherit'>
                                <WbSunnyOutlined />
                            </IconButton> :
                            <IconButton aria-label="toggleDarkmode"
                                        onClick={() => darkModeSignal.value = true}
                                        color='info'>
                                <Brightness2 />
                            </IconButton>
                        }
                    </Stack>
                </div>
            </Toolbar>
            <Sidebar/>
        </AppBar>
    );
}
