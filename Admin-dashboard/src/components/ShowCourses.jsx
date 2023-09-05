import React from "react";
import {Card,Typography} from "@mui/material";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import IconButton from '@mui/material/IconButton';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import EditIcon from '@mui/icons-material/Edit';

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
      // console.log("I run everytime this component rerenders")

      axios
        .get("http://localhost:3000/admin/courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          let data = response.data;
          setCourses(data);
        })
        .catch((error) => console.error(error));
    }, []);

    return (<>
            <div style={{display: "flex", flexWrap:"wrap", justifyContent: "center"}}>
                <Typography variant="h4" style={{margin:'20px',color: '#0b2d39'}}>All Courses</Typography>
            </div>
    
            <div style={{display: "flex", flexWrap:"wrap", justifyContent: "center"}}>
                {courses.map(c => <Course Course={c} navigate={useNavigate} courses={courses} setCourses={setCourses} setOpen={setOpen}/>)}

              <CustomizedSnackbars open={open} setOpen={setOpen}></CustomizedSnackbars>
            </div>
            </>)
  }

function Course(props) {
    const navigate = useNavigate();
    let path = '/courses/' + props.Course._id;

    return <Card style={{margin: 10 , width : 320, minheight : 200, borderRadius: '30px'}}>
              <div style={{width: 320, height: 170}}>
                  <img src= {props.Course.imageLink} style={{width: '100%', height: '100%', objectFit: 'fill',}} alt="course" />
              </div>

              <div style={{padding:'15px'}}>
                <Typography fontWeight= 'bold' textAlign='center' variant="h5">{props.Course.title}</Typography>
                <Typography>{props.Course.description}</Typography>
              </div>

              <div style={{display:'flex', margin:'10px', justifyContent: 'space-between', marginTop: '10px', marginLeft: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                  <CurrencyRupeeIcon></CurrencyRupeeIcon>
                  <Typography fontWeight="bold" variant="h5">{props.Course.price}/-</Typography>
              </div>

              <div style={{display: "flex"}}>
                <IconButton aria-label="delete" size="medium"
                  onClick={()=> {
                    navigate(path)
                }}>
                <EditIcon color="secondary" fontSize="inherit" />
                </IconButton>

                <IconButton aria-label="delete" size="medium"
                  onClick={()=> {
                    var resp = window.prompt(`Please,Type "Delete" to delete ${props.Course.title}`)
                    if(resp === 'Delete'){
                      axios.delete("http://localhost:3000/admin/courses/"+ props.Course._id, {
                        headers: {
                          Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                      })
                      .then((response) => {
                        props.setOpen(true);
                        let message = response.data.message;
                        console.log(message);
                        props.setCourses(props.courses.filter(course => course._id !== props.Course._id));
                      })}}
                  }>
                  <DeleteTwoTone sx={{ color: "red" }} fontSize="inherit" />
                 </IconButton>
              </div>

              </div>
        </Card>
}

function CustomizedSnackbars({open,setOpen}) {
  const Alert = React.forwardRef(function Alert(props, ref) {
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
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Course Deleted Successfully !
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default ShowCourses;