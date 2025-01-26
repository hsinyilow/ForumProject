import Typography from '@mui/material/Typography';
import { 
    Card, CardContent, CardHeader,
    IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function Reply(){
    return(
        <Card variant='outlined' sx={{ marginBottom: '1em', width:'100%'}}>
            <CardHeader 
              avatar={<IconButton sx={{border: '1px #222 solid'}}><PersonIcon /></IconButton>} 
              title='username'
              subheader='Date posted' />
            <CardContent sx={{paddingTop: '0px'}}>

                <Typography variant="body1" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                </Typography>
            </CardContent>  
        </Card>
    );
}

export default Reply;