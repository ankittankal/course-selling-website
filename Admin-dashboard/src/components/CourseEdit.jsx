import { Typography, TextField, Button, Card, Grid} from "@mui/material";
import { useEffect, useState, forwardRef } from "react"
import { useParams } from 'react-router-dom';
import { courseState } from "../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage } from "../store/selectors/course";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";

function CourseEdit() {
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/admin/courses/" + courseId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse({isLoading: false, course: res.data.course});
        });
    }, []);

    if (courseLoading) {
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading....
        </div>
    }

    return <div>
        <GrayTopper/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard setOpen={setOpen}/> 
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard/>
            </Grid>
        </Grid>

        <CustomizedSnackbars open={open} setOpen={setOpen}></CustomizedSnackbars>
    </div>
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);

    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard(props) {
    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);

        // Initialize local states using courseDetails once it's available
        // const [title, setTitle] = useState('');
        // const [description, setDescription] = useState('');
        // const [image, setImage] = useState('');
        // const [price, setPrice] = useState('');
    
        useEffect(() => {
            if (courseDetails.course) {
                setTitle(courseDetails.course.title);
                setDescription(courseDetails.course.description);
                setImage(courseDetails.course.imageLink);
                setPrice(courseDetails.course.price);
            }
        }, [courseDetails]);

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>

            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />
            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />
            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />

            <Button
                variant="contained"
                style={{ backgroundColor: '#0b2d39' }}
                onClick={async () => {
                    axios.put("http://localhost:3000/admin/courses/" + courseDetails.course._id, {
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true,
                        price
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    let updatedCourse = {
                        title: title,
                        description: description,
                        imageLink: image,
                        price,
                        _id : courseDetails.course._id,
                    };

                    props.setOpen(true);
                    setCourse({course: updatedCourse, isLoading: false});
                }}
            > Update course</Button>
        </div>
    </Card>
</div>
}

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const imageLink = useRecoilValue(courseImage);

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={imageLink} style={{width: 350,height:190}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{title}</Typography>
            <Price/>
        </div>
    </Card>
    </div>
}

function Price() {
    const price = useRecoilValue(coursePrice);
    
    return(<>    
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
        </>)
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
            Course Details Edited Successfully !
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

export default CourseEdit;