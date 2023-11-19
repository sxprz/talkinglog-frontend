import * as React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';
import { ConversationSide, Status, conversationSignal, currentSessionIdSignal, promptTextSignal, areFilesUploadedSignal, promptProcessingSignal } from '../App';
import axios from 'axios';

const Input = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

const baseUrl = `https://immortal-up-weevil.ngrok-free.app`;
const promptUrl = baseUrl + `/prompt`;
const checkUrl = baseUrl + `/check`;

const onSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        promptProcessingSignal.value = { status: Status.RUNNING, additionalInfo: "" };

        // Listen to server for results every 5 seconds as it reduces the number of available connections from the server after sending the input
        const promptFormdata = new FormData();
        const checkFormdata = new FormData();
        const sessionId = currentSessionIdSignal.value;

        promptFormdata.append("session", sessionId);
        promptFormdata.append("prompt", promptTextSignal.value);
        checkFormdata.append("session", sessionId);

        axios({
            url: promptUrl,
            method: `POST`,
            data: promptFormdata
        }).then(() => {
            
            const interval = setInterval(() => {

                axios({
                    url: checkUrl,
                    method: `POST`,
                    data: checkFormdata
                }).then(res => {
                    const response : string = res.data;
                    if (response !== "waiting") {
                        promptProcessingSignal.value = { status: Status.SUCCESS, additionalInfo: "" };
                        conversationSignal.value.unshift({ side: ConversationSide.AI, message: response });
                        console.log(conversationSignal.value)
                        clearInterval(interval);
                    }
                }, err => {
                    promptProcessingSignal.value = { status: Status.FAILURE, additionalInfo: err };
                    clearInterval(interval);
                });
    
            }, 5000);

        }, err => {
            promptProcessingSignal.value = { status: Status.FAILURE, additionalInfo: err };
        });
        
        event.preventDefault();
    }
 }
 

export default function Chatbar() {
  return <Input onKeyDownCapture={onSend} disabled={areFilesUploadedSignal.value.status !== Status.SUCCESS} style={{ alignSelf: "center" }} aria-label="Demo input" placeholder="Upload file(s) to start talking with your log files..." />;
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElement = styled('input')(
  ({ theme }) => `
  width: 700px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  align-self: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);