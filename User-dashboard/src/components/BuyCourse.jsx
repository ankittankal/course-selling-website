import { Card, Grid,Typography, Button } from "@mui/material";
import { useEffect, useState, forwardRef } from "react"
import { useParams } from 'react-router-dom';
import { courseState } from "../store/atoms/course";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage,courseDescription } from "../store/selectors/course";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";

function BuyCourse() {
    let { courseId } = useParams();
    const [IsPurchased, setIsPurchased] = useState(false);
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);
    const title = useRecoilValue(courseTitle);
    const Description = useRecoilValue(courseDescription);
    const price = useRecoilValue(coursePrice);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/user/courses/" + courseId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            const found = res.data.purchasedCourses.includes(courseId);
            if (found) {
                setIsPurchased(true);
            }
            setCourse({isLoading: false, course: res.data.course});
        });
    }, []);

    if (courseLoading) {
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading....
        </div>
    }

    if(IsPurchased){
        return (<div>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <div style={{marginTop: 15, marginLeft:"20%"}}>
                    
                    <FirstCard/> 

                    <Typography 
                        fontWeight="bold" 
                        color='#0b2d39'
                        variant="h4"
                        style={{marginTop:'20px'}}
                        > {title}</Typography>
                    <Typography variant= "h6">{Description}</Typography>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                        <CurrencyRupeeIcon></CurrencyRupeeIcon>
                        <Typography fontWeight="bold" variant="h5">{price}/-</Typography>
                    </div>
                    <Button 
                        variant="contained" color="success"
                        style={{borderRadius: "30px", paddingLeft: '20px', paddingRight: '20px', marginTop:'20px'}}
                        >Purchased</Button>
                    <Button 
                        style={{  backgroundColor:"#0b2d39",color:"white",borderRadius: "30px", paddingLeft: '20px', paddingRight: '20px', marginTop:'20px', marginLeft: '30px'}}
                        >View Content</Button>
                </div>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseDetails/>
            </Grid>
        </Grid>

        <CustomizedSnackbars open={open} setOpen={setOpen}></CustomizedSnackbars>
    </div>)
    }

    return <div>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>    
                    <div style={{marginTop: 15, marginLeft:"20%"}}>
                        <FirstCard/> 
                        <Typography 
                            fontWeight="bold" 
                            color='#0b2d39'
                            variant="h4"
                            style={{marginTop:'20px'}}
                            > {title}
                             </Typography>
                        <Typography variant= "h6">{Description}</Typography>
                        <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                            <CurrencyRupeeIcon></CurrencyRupeeIcon>
                            <Typography fontWeight="bold" variant="h5">{price}/-</Typography>
                        </div>
                        <Button 
                            style={{  backgroundColor:"#0b2d39",color:"white",borderRadius: "30px", paddingLeft: '20px', paddingRight: '20px', marginTop:'20px'}}
                            onClick={()=>{
                                axios.post("http://localhost:3000/user/courses/" + courseId,{}, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }
                                }).then(res => {
                                    console.log(res.data.message);
                                    setIsPurchased(true);
                                    setOpen(true);
                                });
                            }}
                            >Purchase</Button>
                    </div>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseDetails/>
            </Grid>
        </Grid>
    </div>
}

function FirstCard() {
    const imageLink = useRecoilValue(courseImage);

    return  (<div style={{display: "flex"}}>
                <Card varint={"outlined"} style={{maxWidth: 600, width: 300, height: 200, marginTop: 100, borderRadius: '30px'}}>
                    <div style={{width: '100%', height: '100%'}}>
                        <img src= {imageLink} style={{width: '100%', height: '100%', objectFit: 'fill' }} alt="course" />
                    </div>
                </Card>
            </div>)
}

function CourseDetails() {
    return <div style={{display: "flex",  marginTop: 90, justifyContent: "center", width: "100%", textAlign: 'center' }}>
     <Card style={{
                margin: 10,
                width: 450,
                minHeight: 400,
                borderRadius: 10,
                marginRight: 70,
                paddingBottom: 15,
                backgroundColor: '#0b2d39',
                zIndex: 2
            }}>
        <div style={{marginTop: 20}}>
            <Typography 
                fontWeight="bold" 
                color="white"
                variant="h5">Course Overview</Typography>   
        </div>
        <div>
            <Card style={{
                margin: 25,
                width: '87%',
                minHeight: 400,
                borderRadius: 30,
                paddingBottom: 15,
                zIndex: 2
            }}>
                <div style={{marginLeft: 0, marginTop: 30}}>
                    <div style={{marginBottom: '20px',display:"flex",marginLeft: '30px'}}>
                        <SignalCellularAltIcon color="disabled" sx={{ m: 1 }}></SignalCellularAltIcon>
                        <Typography variant="h7" sx={{ fontFamily: 'default', m: 1.5 }}>Begineer To Pro</Typography>
                    </div>

                    <div style={{marginBottom: '20px',display:"flex",marginLeft: '30px'}}>
                        <OndemandVideoIcon color="disabled" sx={{ m: 1 }}></OndemandVideoIcon>
                        <Typography variant="h7" sx={{ fontFamily: 'default', m: 1.5 }}>50+ Hours of HD Videos</Typography>
                    </div>

                    <div style={{marginBottom: '20px',display:"flex",marginLeft: '30px'}}>
                        <DownloadForOfflineIcon color="disabled" sx={{ m: 1 }}></DownloadForOfflineIcon>
                        <Typography variant="h7" sx={{ fontFamily: 'default', m: 1.5 }}>Downloadable Content</Typography>
                    </div>
                    <div style={{marginBottom: '20px',display:"flex",marginLeft: '30px'}}>
                        <ClosedCaptionIcon color="disabled" sx={{ m: 1 }}></ClosedCaptionIcon>
                        <Typography variant="h7" sx={{ fontFamily: 'default', m: 1.5 }}>English Captions</Typography>
                    </div>

                    <div style={{marginBottom: '20px',display:"flex",marginLeft: '30px'}}>
                        <CardMembershipIcon color="disabled" sx={{ m: 1 }}></CardMembershipIcon>
                        <Typography variant="h7" sx={{ fontFamily: 'default', m: 1.5 }}>Certificate of Completion</Typography>
                    </div>

                    <div style={{marginBottom: '30px',display:"flex",marginLeft: '30px'}}>
                        <AllInclusiveIcon color="disabled" sx={{ m: 1 }}></AllInclusiveIcon>
                        <Typography variant="h7" sx={{ fontFamily: 'default', m: 1.5 }}>LifeTime access</Typography>
                    </div>

                </div>
            </Card>
        </div>
    </Card>
   </div>
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
            Course Purchased Successfully !
          </Alert>
        </Snackbar>
      </Stack>
    );
  }
export default BuyCourse;