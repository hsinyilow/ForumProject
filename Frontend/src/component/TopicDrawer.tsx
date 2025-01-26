import { useState } from 'react'
import {
    Box, Drawer, 
    Card, CardHeader, CardContent,
    ListItem, ListItemButton, List,ListItemText, ListItemIcon,
    Dialog, Toolbar, TextField, Select, MenuItem, InputLabel,
    IconButton, Button,
    Typography,
    FormControl
} from '@mui/material';
//import axios from 'axios';
import * as MUIcon from '@mui/icons-material';

interface SimpleDialogProps {
    open: boolean;
}


function TopicDrawer(){
    const [open, setOpen] = useState([false, false]);
    
    function handleClickOpen(button : number) {
        if(button == 0){
            setOpen([true, false]);
        } else {
            setOpen([false, true]);
        }
    }
  
    function handleClose() {
      setOpen([false, false]);
    }
    
    function GetButtonImage(index : number) {
        //param index = array index = output icon
        let TempIcon = MUIcon["Newspaper"];
        switch(index) {
            case 0:
                TempIcon = MUIcon["Newspaper"];
                break;
            case 1: 
                TempIcon = MUIcon["Tv"];
                break;
            case 2:
                TempIcon = MUIcon["SportsEsports"];
                break;
            case 3:
                TempIcon = MUIcon["DirectionsCar"];
                break;
            case 4:
                TempIcon = MUIcon["SportsBaseball"];
                break;
            default:
                TempIcon = MUIcon["Newspaper"];
                break;
        }
        return (<TempIcon/>);
    }

    function AddTopic(props: SimpleDialogProps){
        const {open} = props
    
        return (
          <Dialog open={open} onClose={handleClose}>
          <Card variant='outlined' sx={{textAlign:'center'}}>
              <CardHeader title='Add New Topic' />
              <CardContent>
                <Box component='form' noValidate>
                  <TextField required label='Topic Name' placeholder='Enter the topic name'></TextField>
                  <Typography variant='subtitle1' component="div"sx={{ color: 'text.secondary' }}>Select a topic icon</Typography>
                  <IconButton><MUIcon.SportsBaseball/></IconButton>
                  <IconButton><MUIcon.SportsEsports/></IconButton>
                  <IconButton><MUIcon.DirectionsCar/></IconButton>
                  <IconButton><MUIcon.Newspaper/></IconButton>
                  <IconButton><MUIcon.Tv/></IconButton>
                  <Button type='submit' color='primary' variant='contained' 
                        sx={{display:'block', marginInline: 'auto', marginTop: '0.5em'}}>Create</Button>
                </Box>
              </CardContent>
              </Card>
          </Dialog>
        )

    }

    function AddThread(props: SimpleDialogProps){
        const {open} = props
    
        return (
          <Dialog open={open} onClose={handleClose} fullWidth>
          <Card variant='outlined' sx={{textAlign:'center'}}>
              <CardHeader title='Add New Thread' />
              <CardContent >
                <Box component='form' noValidate >
                    <TextField fullWidth label='Thread Title' placeholder='Enter the title'></TextField>
                    <Box sx={{height: '10px'}} />
                    <TextField fullWidth multiline rows={5} label='Thread Description' placeholder='Description'></TextField>
                    <Box sx={{height: '10px'}} />
                    <FormControl fullWidth>
                        <InputLabel>Select a topic</InputLabel>
                        <Select label='select-topic'>
                            <MenuItem>General</MenuItem>
                            <MenuItem>Entertainment</MenuItem>
                            <MenuItem>Games</MenuItem>
                        </Select>
                    </FormControl>
                  <Box sx={{height: '10px'}} />
                  <Button color='primary' variant='contained' 
                          sx={{marginInline: 'auto', marginTop: '0.5em', marginRight: '10px'}}>Upload Image</Button>
                  <Button onClick={handleClose} color='primary' variant='contained' 
                          sx={{marginInline: 'auto', marginTop: '0.5em', marginRight: '10px'}}>Cancel</Button>
                  <Button type='submit' color='primary' variant='contained' 
                          sx={{marginInline: 'auto', marginTop: '0.5em'}}>Create</Button>
                </Box>
              </CardContent>
              </Card>
          </Dialog>
        )

    }
    
    return (
        <>
            <Drawer variant="permanent" sx={{width: '15%', flexShrink: 0, 
                    [`& .MuiDrawer-paper`]: { width: '15%', boxSizing: 'border-box' },}}>
        
                {/* spacing */}
                <Toolbar/>
                <Box sx={{marginLeft: '10px'}}>
                    <Typography variant='h5'>Topics</Typography>
                    <List>
                        {['General', 'Entertainment', 'Game'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block'}}>
                                <ListItemButton sx={{minHeight: 48, px: 2.5}}>
                                    <ListItemIcon sx={[{minWidth: 0, justifyContent: 'center'}]}>
                                         {GetButtonImage(index)}
                                    </ListItemIcon>
                                <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))
                        }
                    </List>
                    <Button onClick={() =>handleClickOpen(0)} variant='outlined' 
                            color="inherit" sx={{ marginLeft: "auto" }}>Add topic</Button>
                    <Box sx={{height: '10px'}} />
                    <Button onClick={() =>handleClickOpen(1)} variant='outlined' 
                            color="inherit" sx={{ marginLeft: "auto" }}>Add new thread</Button>
                </Box>
                
            </Drawer>
                        
            <AddTopic open={open[0]} />
            <AddThread open={open[1]} />
        </>
    );
}

export default TopicDrawer;