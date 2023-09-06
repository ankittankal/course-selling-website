import React from "react";
import { Card,Typography, CardActionArea,CardContent} from "@mui/material";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from "axios";

function PurchasedCourses() {
    const [PurchasedCourses, setPurchasedCourses] = React.useState([]);
    
    useEffect(() => {
      // console.log("I run everytime this component rerenders")

      axios
        .get("http://localhost:3000/user/purchasedCourses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          let purchasedCourses = response.data.purchasedCourses;
          setPurchasedCourses(purchasedCourses);
        })
        .catch((error) => console.error(error));
    }, []);

    return (<><div style={{display: "flex", flexWrap:"wrap", justifyContent: "center"}}>
                <Typography variant="h4" style={{margin:'20px',color: '#0b2d39'}}>My Purchases</Typography>
              </div>

              <div style={{display: "flex", flexWrap:"wrap", justifyContent: "center"}}>
                  {PurchasedCourses.map(c => <Course Course={c}/>)}
              </div>
            </>)
}

function Course({Course}) {
  let path = '/courses/' + Course._id;

  return (
      <Card style={{margin: 10 , width : 320, minheight : 200, borderRadius: '30px'}}>
          <CardActionArea component={Link} to={path}>
            <CardContent style={{padding:0}}>
                <div style={{width: 320, height: 170}}>
                  <img src= {Course.imageLink} style={{width: '100%', height: '100%', objectFit: 'fill',}} alt="course" />
                </div>
                <div style={{padding:'15px'}}>
                <Typography fontWeight= 'bold' textAlign='center' variant="h5">{Course.title}</Typography>
                <Typography>{Course.description}</Typography>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '15px', marginLeft: '15px'}}>
                    <CurrencyRupeeIcon></CurrencyRupeeIcon>
                    <Typography fontWeight="bold" variant="h5">{Course.price}/-</Typography>
                </div>
            </CardContent>
          </CardActionArea>
      </Card>)
}

export default PurchasedCourses;