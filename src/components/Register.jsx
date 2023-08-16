import React from "react";
import { TextField, Card, Button, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [statusCode, setStatusCode] = React.useState(null);
    const navigate = useNavigate();

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{textAlign : 'center'}}>
        <br/>

        <Card variant="outlined"
              style={{width: '400px' , padding: '60px'}} >
            <div>

            <Typography style={{fontWeight: 'bold' }} variant= {"h5"} >Sign In</Typography>
            <Typography style={{fontWeight: 'bold' }} variant= {"h7"} >Good to see you again !</Typography>
            <br></br>
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
                type= {"passsword"}
                onChange={e => setPassword(e.target.value)}/>

            <br></br><br></br>

            <Button variant="contained"
                    
                    onClick={()=> {
                        fetch("http://localhost:3000/admin/signup", {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: username,
                                password: password,
                            }),
                          })
                            .then(response => {
                                console.log("Status code:", response.status);
                                setStatusCode(response.status);
                                return response.json()})
                            .then(data => {
                                localStorage.setItem("token", data.token);
                                console.log(data);
                                navigate('/courses'); // Navigate to success route
                            })
                     }}>Next</Button>
            </div>
        </Card>

        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
    </div>
}

export default Register;