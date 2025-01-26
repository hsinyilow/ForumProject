import { useState } from 'react'
import {
  Container, Box, Toolbar,
  Card, CardHeader, CardMedia, CardContent,
  Button, IconButton,
  Typography
} from '@mui/material';
import * as MUIcon from '@mui/icons-material';
//import axios from 'axios';

import TopicDrawer from '../component/TopicDrawer';
import Ranking from '../component/Ranking';
import Divider from '@mui/material/Divider';
import Reply from '../component/Reply';
  
function ThreadPageTemplate() {
  const [replies, addReplies] = useState();
  
  return(
    <>
    {/* Header */}
    <Box sx={{ display: 'flex' }}>

    {/* Left drawer: topics list */}
    <TopicDrawer/>
    {/*Center area:post list */}
    <Container component="main" maxWidth="lg">
        <Toolbar/>
        <Box sx={{height: '10px'}} />
        <Card>
          <CardHeader 
            avatar={<IconButton sx={{border: '1px #222 solid'}}><MUIcon.Person /></IconButton>} 
            title='username  &#8226; Date posted'
            subheader='topic' />
          <CardContent sx={{paddingTop: '0px'}}>
          <Typography variant="h5" sx={{ color: 'text.primary' }}> Title</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}> Lorem ipsum</Typography>
          </CardContent>
          <CardMedia 
            component="img"
            image="/images/placeholder.jpg" />
        </Card>

        <Box sx={{paddingLeft:'0px', paddingTop:'24px', '@media (min-width: 600px)': {paddingLeft:'0px'}}}>
          <Button variant='contained' startIcon={<MUIcon.ThumbUp/>} sx={{marginRight:'15px'}}> Like</Button>
          <Button variant='contained' startIcon={<MUIcon.ChatBubble/>}>Add Comment</Button>
        </Box>

        <Divider orientation="horizontal" variant="middle" sx={{height: '10px', margin: '10px 0px '}} />
        <h1>Comment section</h1>
        <Reply />
      </Container>  

      {/* Right drawer: Post rank */}
      <Ranking />
      </Box>
    </>
  )   
}

export default ThreadPageTemplate;