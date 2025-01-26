import {useContext, useState } from 'react';
import {
  Card, CardHeader, CardContent,
  Dialog, TextField,
  Box, AppBar, Toolbar, Link,
  Button, IconButton, 
  Typography
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import UserContext from '../UserContext';

interface SimpleDialogProps {
  open: boolean;
}

function AppHeader(){
  const [swapLogin, setSwapLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  //global user
  const user = useContext(UserContext);

  //dialogue open and close
  function handleClickOpen() {
    setOpen(true);
  }
  
  function handleClose() {
    setOpen(false);
    setErrorMessage("");
  }

  //swap between login and sign up
  const toggleSwap = () => {
    setSwapLogin(!swapLogin);
    setErrorMessage("");
  }
    
  function Login(props: SimpleDialogProps){
    const {open} = props;
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      
      //prevent from reloading
      e.preventDefault();
    
      // read the form data
      const form = e.currentTarget;
      const formData = new FormData(form);
      const usernameInput = formData.get("username");
      
      //required field
      if(usernameInput == null || usernameInput.toString() == ""){
        setErrorMessage("Username field is empty");
        return;
      }

      if(swapLogin){
        //create new account, return error if already have account
        axios.post('/api/user', {
          username:  usernameInput.toString()
        })
        .then(function (response) {
          //create account
          console.log(response.data);
          handleClose();
        })
        .catch(function (error) {
          //account exists
          setErrorMessage("username already exists");
          console.log(error);
        });
        
      } else {
        //check for existing account, return error if not found
        axios.get('/api/user', {
          params: {
            username:  usernameInput.toString()
          }
        })
        .then(function (response) {
          const id = response.data.userID;

          if (id == -1) {
            //no user found
            setErrorMessage("This account does not exist");
          } else {
            //user found
            user.setCurrentUser({userID: id, username: usernameInput.toString()});
            handleClose();
          }
          console.log(response.data);
        })
        .catch(function (error) {
          //if any errors
          console.log(error);
        });
      }
    }
      
    
    return(
      <Dialog open={open} onClose={handleClose}>
          <Card variant='outlined' sx={{textAlign:'center'}}>
              <CardHeader title={ swapLogin? 'Sign Up' : 'Log In'} />
              <Box component='form' noValidate onSubmit={handleSubmit}>
                <TextField required name="username" label='Username' placeholder='Enter your username'></TextField>
                <Button type='submit' color='primary' variant='contained' 
                        sx={{display:'block', marginInline: 'auto', marginTop: '0.5em'}}>
                  { swapLogin? 'Sign Up' : 'Log In'}
                </Button>
              </Box>
              <CardContent>
              <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'red' }}
              > {errorMessage}</Typography>
              <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'text.secondary' }}
              >
                { swapLogin? 'Have An Account? ' : 'No account? '} 
                <Link href="#" onClick={toggleSwap}>{ swapLogin? 'Log In' : 'Sign Up'}</Link>
              </Typography>
              </CardContent>
          </Card>
      </Dialog>
    );
  }
    return(
      <>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
            <IconButton sx={{color:"white"}}><HomeIcon /></IconButton>
            <Button color="inherit" sx={{ marginLeft: "auto" }}>Search</Button>
            {user.userID == -1 
              ?<Button variant="outlined" color="inherit" onClick={() => handleClickOpen()} sx={{ marginLeft: "auto"}}>Log In</Button> 
              :<Typography variant="body1" sx={{ color: 'white',marginLeft: "auto" }}>Welcome {user.username}!</Typography>}
            
            </Toolbar>
        </AppBar>

        <Login open={open} /> 
      </>
    );
}

export default AppHeader;