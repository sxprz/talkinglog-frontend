import { Signal, signal } from '@preact/signals-react'
import './App.css'
import { Content } from './views/Content';
import { Stack } from '@mui/system';
import Bar from './components/Bar';
import { AppBar, Grid, Toolbar } from '@mui/material';
import Chatbar from './components/Chatbar';

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
export const darkModeSignal = signal(false);

function App() {
  return (
    <Stack spacing={5} width="100vw">
      <Bar />
      <Content />
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "transparent" }}>
        <Toolbar>
        <Grid container justifyContent="center">
          <Chatbar />
        </Grid>
        </Toolbar>
      </AppBar>
    </Stack>
  )
}

export default App
