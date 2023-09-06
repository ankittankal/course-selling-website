import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {useRecoilValue} from "recoil";
import { userEmailState } from "../store/selectors/userEmail"
import {isUserLoading} from "../store/selectors/isUserLoading";

function Landing() {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <Typography variant="h2" color="#0b2d39" >
                Welcome to LearnVista
            </Typography>

            {!userLoading && !userEmail && <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: '#0b2d39' }}
                        onClick={() => navigate('/register')}
                    >Sign Up</Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ color: '#0b2d39' , borderColor:'#0b2d39' }}
                        onClick={() => navigate('/login')}
                    >Sign In</Button>
                </Grid>
            </Grid>}
            <div style={{ marginTop: '40px' }}>
                <img style={{ width: '100%', maxWidth: '700px'}} src="src\assets\userside.webp" alt="image Not Available" />
            </div>
        </div>
    );
}

export default Landing;
