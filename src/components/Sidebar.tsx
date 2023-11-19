import * as React from 'react';
import { Status, chatHistoryStoreSignal, currentSessionIdSignal, historyProcessingSignal, sidebarSignal } from '../App';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const Sidebar = () => {

  const toggleSidebar = (open: boolean) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      sidebarSignal.value = open;
    };
  };

  const baseUrl = `https://immortal-up-weevil.ngrok-free.app`;
  const promptUrl = baseUrl + `/history`;

  const onRequestHistory = () => {
    historyProcessingSignal.value = { status: Status.RUNNING, additionalInfo: "" };

      // Listen to server for results every 5 seconds as it reduces the number of available connections from the server after sending the input
      const formdata = new FormData();
      const sessionId = currentSessionIdSignal.value;
      formdata.append("session", sessionId);

      axios({
          url: promptUrl,
          method: `POST`,
          data: formdata
      }).then(res => {
        const data = res.data;
        if (data === null) {
          historyProcessingSignal.value = { status: Status.FAILURE, additionalInfo: "Chat History: Unknown Error" }
        } else {
          historyProcessingSignal.value = { status: Status.SUCCESS, additionalInfo: "" }
          chatHistoryStoreSignal.value = data;
        }

      }, err => {
        historyProcessingSignal.value = { status: Status.FAILURE, additionalInfo: err };
      });
  }

  if (sidebarSignal.value && currentSessionIdSignal.value !== null && currentSessionIdSignal.value.length > 0) {
    onRequestHistory();
  }

  const list =
    <Box
      sx={{ width: 375 }}
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <Typography variant="h5" textTransform="none" justifyContent="center" display="flex" style={{ margin: "1em" }}>
        Conversation History
      </Typography>
      <List>
        {chatHistoryStoreSignal.value.map((text) => {
          const excerpt = text.slice(text.indexOf('\\n'));

          return (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={excerpt} />
              </ListItemButton>
            </ListItem>
          )})
        }
      </List>
    </Box>;

  return (
    <div>
      <React.Fragment key="left">
          <Drawer
            anchor="left"
            open={sidebarSignal.value}
            onClose={toggleSidebar(false)}
          >
            {list}
          </Drawer>
        </React.Fragment>
    </div>
  );
}