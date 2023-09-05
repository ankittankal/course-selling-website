import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ControlledOpenSelect(props) {
  const [publish, setPublish] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    // Convert the selected string value to a boolean
    const isPublished = selectedValue.toLowerCase() === "yes" ? true : false;

    setPublish(event.target.value);
    props.setPublished(isPublished);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div  style={{ maxWidth: '505px', margin: '10px', width: '100%' }}>
      <FormControl fullWidth >
        <InputLabel id="demo-controlled-open-select-label">Published</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={publish}
          label="published"
          onChange={handleChange}
        >
          <MenuItem value={"yes"}>yes</MenuItem>
          <MenuItem value={"no"}>no</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
