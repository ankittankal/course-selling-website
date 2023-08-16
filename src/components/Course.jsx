import React from "react";
import { TextField, Card, Button, Typography} from "@mui/material";
import { useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";

function Course() {
    const [courses, setCourses] = React.useState([]);
    const { courseId } = useParams();
    console.log(courseId);

    useEffect(() => {
        axios.get("http://localhost:3000/admin/courses",
                { headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                  }
              })
                .then(response => {
                  let data = response.data;
                  console.log(data);
                  setCourses(data.courses);
                })
                .catch(error => console.error(error));
    },[]);

    let courseIdExists = null;

    for (let i = 0; i < courses.length; i++) {
        if (courseId == courses[i].id) {
            courseIdExists = courses[i];
        }        
    }

    if(!courseIdExists){
        return (
            <div>Loading.....</div>
        );
    }
    return (
        <div style={{display : 'flex', flexWrap: 'wrap', justifyContent : 'center' }}>
        <CourseCard courseDetails = {courseIdExists}></CourseCard>
        <UpdateCourse courseDetails = {courseIdExists} setCourses={setCourses}></UpdateCourse>
        </div>
      );
}

function CourseCard(props) {
    return ( 
        <Card style={{ margin: 10, width: 300, minHeight: 200 }}>
        <Typography textAlign='center' variant="h4">{props.courseDetails.title}</Typography>
        <Typography textAlign='center' variant="h6">{props.courseDetails.description}</Typography>
        <img src={props.courseDetails.imageLink} style={{ width: 300 }} alt={props.courseDetails.title} />
        <Typography variant="h6">{props.courseDetails.price}</Typography>
        </Card>
     );
}

function UpdateCourse(props) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageLink, setImageLink] = React.useState("");
    const [published, setPublished] = React.useState("");

    return (<div>    
        <div style={{display : 'flex' , justifyContent: 'center'}}>
            <Card variant="outlined"
                  style={{color : 'orange' , width: '400px' , padding: '60px'}} >

            <div>
            <Typography variant="h6">Update Course Details</Typography>

            <TextField id="outlined-basic" 
                label="title" 
                variant="outlined" 
                onChange={e => setTitle(e.target.value)}/>
            <br></br>
            <TextField id="outlined-basic" 
                label="description" 
                variant="outlined" 
                onChange={e => setDescription(e.target.value)}/>
            <br></br>
            <TextField id="outlined-basic" 
                label="price" 
                variant="outlined" 
                onChange={e => setPrice(e.target.value)}/>
            <br></br>
            <TextField id="outlined-basic" 
                label="imageLink" 
                variant="outlined" 
                onChange={e => setImageLink(e.target.value)}/>
            <br></br>
            <TextField id="outlined-basic" 
                label="published" 
                variant="outlined" 
                onChange={e => setPublished(e.target.value)}/>
            <br></br><br></br>

            <button 
                onClick={() => {
                    console.log(props.courseDetails.id)
                    fetch("http://localhost:3000/admin/courses/" + props.courseDetails.id , {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    title : title,
                    description : description ,
                    price : price ,
                    imageLink : imageLink ,
                    published : published ,
                })
            })
                .then(response => {
                    return response.json()})
                .then(data => {
                    console.log(data);
                    console.log(props.courseDetails);
                    props.setCourses(prevCourses => {
                        return prevCourses.map(course => {
                          if (course.id === props.courseDetails.id) {
                            return {
                              ...course,
                              title: title,
                              description: description,
                              price: price,
                              imageLink: imageLink,
                              published: published
                            };
                          }
                          return course;
                        });
                      });
                      
                })
                    }}>Update</button>
            <br></br>
            <br></br>
            </div>

            </Card>
        </div>
    </div>);
}

export default Course;