import React from "react";
import { TextField, Card, Button, Typography} from "@mui/material";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    
    useEffect(() => {
        //console.log("I run everytime this component rerenders")

        axios.get("http://localhost:3000/admin/courses",
                { headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                  }
              })
                .then(response => {
                  let data = response.data;
                  console.log(data);
                  setCourses(data);
                })
                .catch(error => console.error(error));

    },[]);

    return <div style={{display: "flex", flexWrap:"wrap", justifyContent: "center"}}>
        {courses.map(c => <Course Course={c} navigate={useNavigate}/>)}
    </div>
}

function Course(props) {
    const navigate = useNavigate();
    let path = '/courses/' + props.Course._id;

    return <Card style={{margin: 10 , width : 300, minheight : 200}}>
        <Typography textAlign= 'center' variant="h4">{props.Course.title}</Typography>
        <Typography textAlign= 'center' variant="h3">{props.Course.price}</Typography>
        <img src={props.Course.imageLink} style={{width:300}}></img>
        <Button 
            variant="contained" 
            size="small" 
            color="secondary"
            onClick={()=> {
                navigate(path)
            }}
            >Edit Course</Button>
        </Card>
}

export default ShowCourses;