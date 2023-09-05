import * as React from 'react';
/*--------AppBar Import----------*/
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableTemporaryDrawer from "./SideBar";
/*-------------------------------*/
import { useNavigate } from 'react-router-dom';
import { isUserLoading } from "../store/selectors/isUserLoading";
import {useSetRecoilState, useRecoilValue} from "recoil";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail"

function ButtonAppBar() {
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    const [state, setState] = React.useState({
       top: false,
       left: false,
       bottom: false,
       right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };


    if (userLoading) {
      return <></>
    }

    if(userEmail){
        return (
            <Box sx={{ flexGrow: 1}}>
        
              <AppBar position="static" style={{ backgroundColor: '#0b2d39' }}>
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}

                    onClick={toggleDrawer("left", true)}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    LearnVista
                  </Typography>
                  {/* Hello, {userEmail} */}
                  
                  <Button color="inherit"
                        onClick={()=>{
                            localStorage.setItem("token", null);
                            setUser({
                              isLoading: false,
                              userEmail: null
                            })
                            navigate('/');
                        }}
                        >Logout</Button>

                </Toolbar>
              </AppBar>
              <SwipeableTemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} ></SwipeableTemporaryDrawer>
            </Box>
          );
    }

    return (
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ backgroundColor: '#0b2d39' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LearnVista
            </Typography>
            <Button 
              color='inherit'
              onClick={()=> {
                navigate('/SignUp');
              }}
                  >Sign up</Button>
            <Button 
              color="inherit"
              onClick={()=> {
                navigate('/login');
              }}
              >Log in</Button>
          </Toolbar>
        </AppBar>
        <SwipeableTemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} ></SwipeableTemporaryDrawer>
      </Box>
  );
}

export default ButtonAppBar;