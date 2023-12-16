import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { splitContentInThree, splitStringInThree } from '@/global/methods';
import { CardData } from '../DataCards/Card';
//https://www.facebook.com/dialog/share?app_id=87741124305&href=https%3A%2F%2Fshiner-suited-only.ngrok-free.app%2FpostDetails%2F5357&display=popup
export default function PostDetails({ post }: Readonly<{ post: CardData }>) {

    const styles = {
        source: {
            display: "inline-block",

        },

    }
    let theContent = post.content ?? post.description
    let content = splitContentInThree(theContent);
    return (
        <>
            <CssBaseline />
            <Box>
                <Card>

                    <CardContent>

                        {/* <Image style={styles.newsLogo} src={post.sourceLogo} alt='logo' width={10} height={10} /> */}
                        <Typography sx={styles.source} variant='h6' display='block'>{post.source_id}</Typography>
                        <br />
                        <Typography sx={styles.source} variant='h6' display='block'> {new Date(post.pubDate).toLocaleTimeString()} </Typography>
                        <br />
                        <Typography sx={styles.source} variant='h4' display='block'>{post.title}</Typography>

                    </CardContent>

                    <CardMedia
                        component="img"
                        image={post.image_url}
                        alt={post.title}
                    />
                    <br />
                    <CardContent>

                        <Typography sx={styles.source} variant='h6' display='block'>
                            {content[0]}
                        </Typography>
                        {/* <Link href="" height="15rem" >
                            <CardMedia
                                sx={{ height: "inherit", objectFit: "fill" }}
                                component="img"
                                src={post.image_url}

                            />
                        </Link> */}
                        <Typography sx={styles.source} variant='h6' display='block'>

                            {content[1]}
                            {content[2]}
                        </Typography>

                    </CardContent>

                </Card>
            </Box>
        </>
    );
}
