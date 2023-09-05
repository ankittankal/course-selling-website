import {forwardRef,useState} from "react";
import { TextField, Card, Button, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    const [open, setOpen] = useState(false);


    const handleNextClick = async () => {
        const response = await axios.post("http://localhost:3000/admin/signup", {
          username: username,
          password: password,
        });
      
          let data = response.data;
          console.log(data.message);
          localStorage.setItem("token", data.token);
          setUser({userEmail: username, isLoading: false})
          setOpen(true);
          navigate('/courses');
      }

    return <>
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
    <CustomizedSnackbars open={open} setOpen={setOpen}></CustomizedSnackbars>
      </>
}

function CustomizedSnackbars({open,setOpen}) {
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
           Sign Up Successfull !
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

export default SignUp;