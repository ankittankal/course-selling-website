import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import TopicIcon from '@mui/icons-material/Topic';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function SwipeableTemporaryDrawer({state,setState,toggleDrawer}) {
    const navigate = useNavigate();

    let GoTo = "";
    const helper = (act)=> {
       if(act == 'Add Course') return "createCourse";
       if(act == 'Home') return "";
       return "courses";
    }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      
    >
      <List>
        {['Home','All Courses','Add Course'].map((text, index) => (
          <ListItem key={text} disablePadding >
            <ListItemButton
                onClick={()=>{
                    GoTo = helper(text)
                    navigate('/'+ GoTo);
                  }}
            >
              <ListItemIcon>
                {index  === 0 ?  <HomeIcon></HomeIcon> : <></> }
                {index  === 1 ?  <TopicIcon></TopicIcon> : <></> }
                {index  === 2 ?  <PostAddIcon></PostAddIcon>  : <></> }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
