import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { shortenText } from './utils/misc.util';

interface iProps {
    title: string;
    shortDescription: string;
    link: string;
    image: string;
    year: string;
}

const MovieCard: FC<iProps> = (props) => {
    const { title, shortDescription, link, image, year } = props;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={image} alt="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title} ({year})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {shortenText(shortDescription, 260)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained">
                    <Link href={link}>
                        <a>View Details</a>
                    </Link>
                </Button>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    );
};

export default MovieCard;
