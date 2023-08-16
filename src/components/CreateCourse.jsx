import React from "react";
import { TextField, Card} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageLink, setImageLink] = React.useState("");
    const [published, setPublished] = React.useState("");
    const navigate = useNavigate();

    const handleOnClick = async () => {
        const response = await axios.post("http://localhost:3000/admin/courses",{
            title : title,
            description : description ,
            price : price ,
            imageLink : imageLink ,
            published : published  },
        { headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        })
        let data = response.data;
        console.log(data.message);
      }

    return (<div>    
        <div style={{display : 'flex' , justifyContent: 'center'}}>
            <Card variant="outlined"
                  style={{color : 'orange' , width: '400px' , padding: '60px'}} >

            <div>
            <h2>Create Course Page</h2>

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
                onClick={handleOnClick}>Create Course</button>
            <br></br>
            <br></br>
            </div>

            </Card>
        </div>
    </div>);
}
export default CreateCourse;