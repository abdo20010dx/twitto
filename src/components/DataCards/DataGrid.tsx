"use client"

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import { Badge, Link } from '@mui/material';
import Image from 'next/image';
import { styles } from '@/global/styles';
import newsLogo from "@/../public/aljazeere-tv.svg"
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material';
export function DataGrid({ post, key, lg = 4, height = "250rem", md = 4, sm = 6, xs = 12 }: any) {
    return (

        <Grid display={'grid'} xs={xs} sm={sm} md={md} lg={lg} key={key} >
            <Card elevation={20} >
                <CardContent >
                    <Image style={styles.newsLogo} src={post.sourceLogo} alt='logo' width={10} height={10} />
                    <Typography sx={styles.source} variant='overline' display='block'>{post.source}</Typography>
                </CardContent>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={post.title}
                // subheader={post.title}
                />
                {/* <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {post.content}
                    
                    </Typography>
                </CardContent> */}
                <Link href={"postDetails/" + post.id}>
                    <CardMedia
                        component="img"
                        height={height}
                        image={post.picture}
                        alt={post.title}
                    />
                </Link>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        {false ? <ThumbDownAlt /> : <ThumbDownOffAlt />}
                        <Typography >1</Typography>
                    </IconButton>
                    <IconButton>
                        {true ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
                        <Typography >5</Typography>

                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>

            </Card>
        </Grid>
    )
}