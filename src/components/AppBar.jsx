import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ButtonAppBar() {
    const [username,setUserName] = React.useState();
    const navigate = useNavigate();

    useEffect(() => {
        //console.log("I run everytime this component rerenders")

        fetch("http://localhost:3000/admin/me", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Bearer " + localStorage.getItem("token"),
                }})
                .then(response => {
                    //console.log("Status code:", response.status);
                    //setStatusCode(response.status);
                    return response.json()})
                .then(data => {
                    //localStorage.setItem("token", data.token);
                    console.log(data);
                    setUserName(data.username);
                    //if (statusCode === 200) {
                    //    navigate('/createCourse'); // Navigate to success route
                    //}
                })
    },[]);

    if(username){
        return (
            <Box sx={{ flexGrow: 1}}>
        
              <AppBar position="static">
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
                    CourseHub
                  </Typography>

                  <Button color="inherit"
                        onClick={()=>{
                          navigate('/createCourse');
                        }}
                        >New Course</Button>

                  <Button color="inherit"
                        onClick={()=>{
                          navigate('/courses');
                        }}
                        >Courses</Button>

                  Hello, {username}
                  
                  <Button color="inherit"
                        onClick={()=>{
                            localStorage.setItem("token", null);
                            window.location = '/';
                        }}
                        >Logout</Button>

                </Toolbar>
              </AppBar>
            </Box>
          );
    }

    return (
    <Box sx={{ flexGrow: 1}}>

      <AppBar position="static">
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
              navigate('/register');
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
    </Box>
  );
}


export default ButtonAppBar;