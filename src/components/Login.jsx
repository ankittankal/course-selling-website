import React from "react";
import { TextField, Card, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleNextClick = () => {
        fetch("http://localhost:3000/admin/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(response => {
            console.log("Status code:", response.status);
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Login failed"); // Handle other status codes if needed
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            console.log(data);
            navigate('/courses'); // Redirect to the desired route
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <br />

                <Card variant="outlined"
                      style={{ width: '400px', padding: '60px' }} >
                    <div>

                        <Typography style={{ textAlign: 'left', fontWeight: 'bold' }} variant={"h5"} >Login</Typography>
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
                                style={{ textTransform: 'none' }}
                                onClick={handleNextClick}>Next</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Register;
