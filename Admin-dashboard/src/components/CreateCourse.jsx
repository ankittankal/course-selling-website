import React from "react";
import { TextField, Card, Button, Typography} from "@mui/material";
import axios from "axios";
import MultipleSelect from "./multiselect";

function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageLink, setImageLink] = React.useState("");
    const [published, setPublished] = React.useState("");

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
         alert("Courses created Successfully");
         console.log(data.message);
      }

    return (<>
        <div style={{display: "flex", flexWrap:"wrap", justifyContent: "center"}}>
            <Typography variant="h4" style={{margin:'20px',color: '#0b2d39'}}>Add Course</Typography>
        </div>

        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '80px', alignItems: 'center'}}>
                <Card variant="outlined" style={{ width: '100%', maxWidth: '600px', padding: '60px', border: "2px solid #0b2d39" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <TextField id="outlined-basic" label="title" variant="outlined"
                            style={{ width: '100%', maxWidth: '505px' }}
                            onChange={e => setTitle(e.target.value)} />
                        <br /><br />

                        <TextField id="outlined-basic" label="description" variant="outlined"
                            style={{ width: '100%', maxWidth: '505px' }}
                            onChange={e => setDescription(e.target.value)} />
                        <br /><br />

                        <TextField id="outlined-basic" label="price" variant="outlined"
                            style={{ width: '100%', maxWidth: '505px' }}
                            onChange={e => setPrice(e.target.value)} />
                        <br /><br />

                        <TextField id="outlined-basic" label="imageLink" variant="outlined"
                            style={{ width: '100%', maxWidth: '505px' }}
                            onChange={e => setImageLink(e.target.value)} />
                        <br /><br />

                        <MultipleSelect setPublished={setPublished}></MultipleSelect>
                        <br /><br />

                        <Button
                            variant="contained"
                            size="small"
                            style={{ backgroundColor: '#0b2d39', padding: '10px' }}
                            onClick={handleOnClick}
                        >Create Course</Button>
                        <br /><br />
                    </div>
                </Card>
            </div>
        </div>
            </>);
}

export default CreateCourse;