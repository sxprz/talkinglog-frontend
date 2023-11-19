import { Signal, signal } from '@preact/signals-react'
import './App.css'
import { Content } from './views/Content';
import { Stack } from '@mui/system';
import Bar from './components/Bar';
import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import Chatbar from './components/Chatbar';
import { Build } from '@mui/icons-material';
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

export const sidebarSignal = signal(false);
export const areFilesUploadedSignal = signal({ status: Status.IDLE, additionalInfo: "" });
export const currentSessionIdSignal = signal("");
export const conversationSignal = signal([]) as unknown as Signal<[ConversationPart]>;
export const promptTextSignal = signal("");
export const promptProcessingSignal = signal({ status: Status.IDLE, additionalInfo: "" });
export const chatHistoryStoreSignal = signal([] as unknown as [string]);
export const historyProcessingSignal = signal({ status: Status.IDLE, additionalInfo: "" });
export const darkModeSignal = signal(false);

function App() {

  const baseUrl = `https://immortal-up-weevil.ngrok-free.app`;
  const demoUrl = baseUrl + `/demo`; 

  const onTriggerDemo = () => {
    areFilesUploadedSignal.value = { status: Status.RUNNING, additionalInfo: "" };

    axios({
        url: demoUrl,
        withCredentials: false, 
        method: `POST`,
    }).then(res => {
        const data = res.data;
        if (data !== null) {
            areFilesUploadedSignal.value = { status: Status.SUCCESS, additionalInfo: "" };
        } else {
            areFilesUploadedSignal.value = { status: Status.FAILURE, additionalInfo: "Demo failed: No further information" };
        }
        currentSessionIdSignal.value = data;
    }, err => {
        areFilesUploadedSignal.value = { status: Status.FAILURE, additionalInfo: err };
    });

  };

  return (
    <Stack spacing={5} width="100vw">
      <Bar />
      <Content />
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "transparent" }}>
        <Toolbar>
        <Grid lg-3 container justifyContent="center">
          <Button component="label" variant="outlined" onClick={onTriggerDemo}>
            <Build />
            <Typography sx={{ textTransform: "none" }}>
                Use Demo Data
            </Typography>
          </Button>
          <Chatbar />
        </Grid>
        </Toolbar>
      </AppBar>
    </Stack>
  )
}

export default App
