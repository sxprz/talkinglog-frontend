import rusLogo from '../assets/rus-logo.svg';
import { sidebarSignal } from '../App';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from './Sidebar';
import { IconButton, Typography } from '@mui/material';

export default function Bar() {
    
    const onClick = () => {
        sidebarSignal.value = true;
    };

    return (
        <AppBar sx={{ top: 0, bottom: "auto", backgroundColor: "#0F194C" }}>
            <Toolbar>
                <IconButton aria-label="menu" sx={{ p: '10px' }} onClick={onClick}>
                    <MenuIcon htmlColor="#FFFFFF"/>
                </IconButton>
                <img src={rusLogo} className="logo rus align-left" alt="RuS logo" style={{ height: "68px", width: "auto", padding: "5pt 1.75em" }}/>
                <div style={{ display: "flex" }}>
                <Typography noWrap>
                    Conversation
                </Typography>
                <Typography noWrap>
                    Analysis
                </Typography>
                </div>
            </Toolbar>
            <Sidebar/>
        </AppBar>
    );
}