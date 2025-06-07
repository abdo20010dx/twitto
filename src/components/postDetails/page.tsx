"use client"
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { splitContentInThree } from '@/global/methods';
import { CardData } from '../DataCards/Card';
import { config } from '@/global/config';
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material';
import ShareButton from '../share/shareButton';
import { styles } from '@/global/styles';

export default function PostDetails({ post: thePost }: Readonly<{ post: CardData }>) {
    const [post, setPost] = useState(thePost);
    const [immotion, setImmotion] = useState(post.like);

    let theContent = post.content ?? post.description;
    let content = splitContentInThree(theContent);

    async function updateImmotion(body: any) {
        const response = await (await fetch(`${config.hostname}/immotions`, {
            body: JSON.stringify(body), method: "POST", cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
        })).json();
        return response.data.data;
    }

    const handleImmotion = async (like: number) => {
        if (like === immotion) like = 0;
        const comingPost = await updateImmotion({ post_id: +post.id, like });
        setPost(comingPost);
        setImmotion(like);
    }

    return (
        <>
            <CssBaseline />
            <Box sx={{ px: { xs: 2, md: 4 } }}>
                <Card>
                    <CardActions disableSpacing sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton aria-label="dislike" onClick={() => handleImmotion(2)}>
                                {immotion === 2 ? <ThumbDownAlt sx={styles.thumbLike} /> : <ThumbDownOffAlt sx={styles.thumbLike} />}
                                <Typography sx={styles.thumbLike}>{post.dislikes}</Typography>
                            </IconButton>
                            <IconButton aria-label="like" onClick={() => handleImmotion(1)}>
                                {immotion === 1 ? <ThumbUpAlt sx={styles.thumbLike} /> : <ThumbUpOffAlt sx={styles.thumbLike} />}
                                <Typography sx={styles.thumbLike}>{post.likes}</Typography>
                            </IconButton>
                        </Box>
                        <ShareButton postId={post.id} />
                    </CardActions>
                    <CardContent>
                        <Typography sx={styles.source} variant="h6" display="block">{post.source_id}</Typography>
                        <Typography sx={styles.source} variant="body2" display="block">{new Date(post.pubDate).toLocaleTimeString()}</Typography>
                        <Typography sx={styles.source} variant="h4" display="block" >{post.title}</Typography>
                    </CardContent>
                    <CardMedia
                        sx={styles.imageDetais}
                        component="img"
                        image={post.image_url}
                        alt={post.title}
                    />
                    <CardContent>
                        <Typography sx={styles.source} variant="body1" display="block">
                            {content[0]}
                        </Typography>
                        <Typography sx={styles.source} variant="body1" display="block">
                            {content[1]}
                            {content[2]}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
