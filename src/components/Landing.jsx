// import { Button } from "@mui/material";
// import React from "react";
// import { useNavigate } from 'react-router-dom';

// /// This is the landing page. You need to add a link to the login page here.
// /// Maybe also check from the backend if the user is already logged in and then show them a logout button
// /// Logging a user out is as simple as deleting the token from the local storage.
// function Landing() {
//     const navigate = useNavigate();

//     return <div>
//         <h1>Welcome to Our App</h1>
//         <div style={{display : 'flex' , justifyContent : 'space-between'}}>
//         <div style={{display : 'flex' , justifyContent : 'center'}}>
//         <Button style={{margin : 15}}
//             variant="contained"
//             onClick={()=> {
//                 navigate('/register'); 
//              }}>SignUp</Button>

//         <Button
//             variant="contained"
//             onClick={()=> {
//                 navigate('/login'); 
//              }}>Login</Button>
//         </div>
//         <img style={{width : 500}} src= "src\assets\Admin-HomePage.jpg" alt="image Not Available" />
//         </div>
//     </div>
// }

// export default Landing;

import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <Typography variant="h2" >
                Welcome to LearnVista
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid>
            <div style={{ marginTop: '40px' }}>
                <img style={{ width: '100%', maxWidth: '500px' }} src="src\assets\Admin-HomePage.jpg" alt="image Not Available" />
            </div>
        </div>
    );
}

export default Landing;
