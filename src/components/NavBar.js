import  * as React from 'react';
import { useContext } from 'react';
import '../Assets/FontsBillabong.ttf'
import './NavBar.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// import {makeStyles} from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search';
import insta_logo from '../Assets/insta_logo.png'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import {AuthContext} from '../context/AuthContext'

export default function NavBar(){
    const {logout} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <>
         <div className='nav'>
            <div className='insta_logo'><img src={insta_logo} alter="logo" ></img></div>
            <div className='search'>
                <TextField
                    id="search-box"
                    placeholder="Search"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                    size = {'small'}
                    variant="outlined"
                />
            </div>
            <div  className='pages'>
                <div className='option'>
                    <button ><HomeRoundedIcon fontSize='large' varient='filled' /></button>
                </div>
                <div className='option'>
                    <button><ChatBubbleOutlineOutlinedIcon fontSize='medium'></ChatBubbleOutlineOutlinedIcon></button>
                </div>
                <div className='option'>
                <button><AddBoxOutlinedIcon fontSize='medium'></AddBoxOutlinedIcon></button>
                </div>
                <div >
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                            </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                            <Avatar /> Profile
                            </MenuItem>
                            <MenuItem>
                            <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                            </MenuItem>
                            <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                            </MenuItem>
                            <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </div>
            </div>
            
            
         </div>
        </>
    )

}