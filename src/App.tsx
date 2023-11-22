import {signal} from '@preact/signals-react'
import './App.css'
import {Content} from './views/Content';
import {Stack} from '@mui/system';
import Bar from './components/Bar';
import {
    AppBar,
    Button,
    CircularProgress,
    createTheme,
    CssBaseline,
    Fade,
    Grid, ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import Chatbar from './components/Chatbar';
import {Build} from '@mui/icons-material';
import axios from 'axios';

export enum Status {
    IDLE,
    RUNNING,
    SUCCESS,
    FAILURE
}

export enum ConversationSide {
    AI,
    USER
}

export type ProgressStatus = {
    status: Status,
    additionalInfo: string
}

export type ConversationPart = {
    side: ConversationSide,
    message: string
}

type ThemeMode = "dark" | "light";

export const sidebarSignal = signal(false);
export const areFilesUploadedSignal = signal<ProgressStatus>({status: Status.IDLE, additionalInfo: ""});
export const currentSessionIdSignal = signal("");
export const conversationSignal = signal<ConversationPart[]>([{
    side: ConversationSide.AI,
    message: "How can I help you today?"
}, {side: ConversationSide.USER, message: "Help me find how many errors there are in the logs, please!"}]);
export const promptTextSignal = signal("");
export const promptProcessingSignal = signal<ProgressStatus>({status: Status.IDLE, additionalInfo: ""});
export const chatHistoryStoreSignal = signal<string[]>([]);
export const historyProcessingSignal = signal<ProgressStatus>({status: Status.IDLE, additionalInfo: ""});
export const themeSignal = signal<ThemeMode>("light");

export default App

function App() {

    const baseUrl = `https://immortal-up-weevil.ngrok-free.app`;
    const demoUrl = baseUrl + `/demo`;

    const onTriggerDemo = () => {
        areFilesUploadedSignal.value = {status: Status.RUNNING, additionalInfo: ""};

        axios({
            url: demoUrl,
            withCredentials: false,
            method: `POST`,
        }).then(res => {
            const data = res.data;
            if (data !== null) {
                areFilesUploadedSignal.value = {status: Status.SUCCESS, additionalInfo: ""};
            } else {
                areFilesUploadedSignal.value = {
                    status: Status.FAILURE,
                    additionalInfo: "Demo failed: No further information"
                };
            }
            currentSessionIdSignal.value = data;
        }, err => {
            areFilesUploadedSignal.value = {status: Status.FAILURE, additionalInfo: err};
        });

    };

    const showSpinner = (areFilesUploadedSignal.value.status === Status.RUNNING || promptProcessingSignal.value.status === Status.RUNNING);
    const theme = createTheme({
        palette: {
            mode: themeSignal.value,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Bar/>

            <Stack spacing={5} width="100vw" style={{alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                <Content/>
                <AppBar position="sticky" elevation={0} style={{backgroundColor: "transparent"}}>
                    <Toolbar>
                        <Grid container justifyContent="space-evenly">
                            <Button component="label" variant="outlined" onClick={onTriggerDemo}>
                                <Build/>
                                <Typography style={{textTransform: "none"}}>
                                    Use Demo Data
                                </Typography>
                            </Button>
                            <Chatbar/>
                            <Fade in={showSpinner}>
                                <CircularProgress style={{alignSelf: "center"}} size={30}/>
                            </Fade>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Stack>

        </ThemeProvider>
    );
}
