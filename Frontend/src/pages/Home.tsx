import {Toolbar, Container, Box} from '@mui/material';

import ThreadCard from '../component/ThreadCard';
import TopicDrawer from '../component/TopicDrawer';
import Ranking from '../component/Ranking';

function Home() {

  return (
  <>
    <Box sx={{ display: 'flex' }}>

    {/* Left drawer: topics list */}
    <TopicDrawer/>
        
    {/*Center area:post list */}
    <Container component="main">
      <Toolbar/>
      <Box sx={{height: '10px'}} />
      <ThreadCard/>
      <ThreadCard/>
      <ThreadCard/>
      <ThreadCard/>
      <ThreadCard/>
    </Container>
    
    {/* Right drawer: Post rank */}
    <Ranking />
  </Box>


  </>
  )
}

export default Home

