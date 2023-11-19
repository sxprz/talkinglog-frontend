import rusLogo from '../assets/rus-logo.svg';
import { ConversationSide, RawUploadStatus, conversationSignal, currentSessionIdSignal, darkModeSignal, sidebarSignal, uploadedFilesSignal } from '../App';
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

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        console.log(files);
        const filesFormdata = new FormData();
        Array.from(files ?? []).forEach(file => filesFormdata.append("logfile", file));
        
        uploadedFilesSignal.value = { status: RawUploadStatus.UPLOADING, additionalInfo: "" };
        console.log("Uploading...");

        axios({
            url: `https://2150-2a09-80c0-192-0-815a-fe17-49cd-206c.ngrok-free.app//upload`,
            method: `POST`,
            data: filesFormdata
        }).then(res => {

            currentSessionIdSignal.value = res.data;
            // Continue to listen to server every 5 seconds as it reduces the number of available connections from the server
            console.log("Uploading... (from inside the async method)");
            uploadedFilesSignal.value = { status: RawUploadStatus.UPLOADING, additionalInfo: "" };
            
            const checkFormdata = new FormData();
            checkFormdata.append("session", currentSessionIdSignal.value);

            setInterval(() => {

                console.log('Listening to server changes');
                axios({
                    url: `https://2150-2a09-80c0-192-0-815a-fe17-49cd-206c.ngrok-free.app//upload`,
                    method: `POST`,
                    data: checkFormdata
                }).then(res => {
                    const prompts : string = res.data;
                    if (prompts !== "waiting") {
                        uploadedFilesSignal.value = { status: RawUploadStatus.SUCCESS, additionalInfo: "" };
                        conversationSignal.value.unshift({ side: ConversationSide.AI, message: prompts });
                        console.log("Upload success, added prompt to current session memory!");
                    }

                }, err => {
                    uploadedFilesSignal.value = { status: RawUploadStatus.FAILURE, additionalInfo: err };
                    console.log("Upload failed!");
                });

            }, 5000);

        }, err => {
            uploadedFilesSignal.value = { status: RawUploadStatus.FAILURE, additionalInfo: err };
            console.log("Upload failed!");
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
                    {uploadedFilesSignal.value.status == RawUploadStatus.SUCCESS ?
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
