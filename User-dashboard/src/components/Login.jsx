import React from "react";
import { TextField, Card, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";

function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    const handleNextClick = async () => {
        const response = await axios.post("http://localhost:3000/user/login", {
          username: username,
          password: password,
        });
      
          let data = response.data;
          console.log(data.message);
          localStorage.setItem("token", data.token);
          setUser({userEmail: username, isLoading: false});
          navigate('/courses'); // Navigate to success route
      }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}> <br />
                <Card variant="outlined" style={{ width: '400px', padding: '60px',border: "2px solid #0b2d39" }} >
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} variant={"h5"} >Log In</Typography>
                        <Typography style={{fontWeight: 'bold' }} variant= {"h7"} >Good to see you again !</Typography>
                        <br></br>
                        <br></br>

                        <TextField id="outlined-basic"
                                   label="Email"
                                   variant="outlined"
                                   type="email"
                                   onChange={e => setUsername(e.target.value)} />

                        <br></br><br></br>

                        <TextField id="outlined-basic"
                                   label="Password"
                                   variant="outlined"
                                   type="password"
                                   onChange={e => setPassword(e.target.value)} />

                        <br></br><br></br>

                        <Button variant="contained"
                                style={{ textTransform: 'none' , backgroundColor: '#0b2d39'}}
                                onClick={handleNextClick}>Next</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Register;
