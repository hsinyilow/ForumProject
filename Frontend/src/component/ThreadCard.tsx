import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia} from '@mui/material';

function ThreadCard() {
    return (
        <Card variant='outlined' sx={{ display: 'flex', marginBottom: '1em', width:'100%'}}>
            <CardMedia
            component="img"
            sx={{ width:'20%'}}
            image="/images/placeholder.jpg"
            alt="Placeholder"
            />
            <CardContent>
            <Typography variant="h5">
                Title
            </Typography>

            <Typography variant="body1" sx={{textOverflow: 'ellipsis', lineClamp: '2', overflow: 'hidden', display: '-webkit-box'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </Typography>
            
            <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: 'text.secondary' }}
            >
                Date posted  &#8226; Topic
            </Typography>
            </CardContent>
        </Card>
    )
}

export default ThreadCard;