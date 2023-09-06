import {useState} from "react";
import { TextField, Card, Button, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";
import axios from 'axios';

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    const handleNextClick = async () => {
        const response = await axios.post("http://localhost:3000/user/signup", {
          username: username,
          password: password,
        });
      
          let data = response.data;
          console.log(data.message);
          localStorage.setItem("token", data.token);
          setUser({userEmail: username, isLoading: false})
          navigate('/courses');
      }

    return (<>
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{textAlign : 'center'}}> <br/>
            <Card variant="outlined"
                  style={{width: '400px' , padding: '60px',border: "2px solid #0b2d39"}} >
                <div>
                    <Typography style={{fontWeight: 'bold' }} variant= {"h5"} >Sign Up</Typography>
                    <br></br>

                    <TextField id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        type="Email"
                        onChange={e => setUsername(e.target.value)}/>

                    <br></br><br></br>

                    <TextField id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={e => setPassword(e.target.value)}/>

                    <br></br><br></br>

                    <Button 
                        variant="contained"  
                        style={{ textTransform: 'none' , backgroundColor: '#0b2d39'}}  
                        onClick={handleNextClick}>
                    Next</Button>
                </div>
            </Card>

            <br/>
            Already a user? <a href="/login">Login</a>
        </div>
    </div>
      </>)
}

export default SignUp;