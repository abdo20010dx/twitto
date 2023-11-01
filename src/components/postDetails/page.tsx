"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { styles } from '@/global/styles';
import { splitContentInThree, splitStringInThree } from '@/global/methods';

export default function PostDetails({ post }: { post: any }) {
    let content = splitContentInThree(post.content);
    return (
        <>
            <CssBaseline />
            <Container>
                <Card>

                    <CardContent>

                        <Image style={styles.newsLogo} src={post.sourceLogo} alt='logo' width={10} height={10} />
                        <Typography sx={styles.source} variant='h2' display='block'>{post.source}</Typography>
                        <br />
                        <Typography sx={styles.source} variant='h4' display='block'> {new Date(post.date).toLocaleTimeString()} </Typography>
                    </CardContent>

                    <CardMedia
                        component="img"
                        image={post.picture}
                        alt={post.title}
                    />
                    <br />
                    <CardContent>

                        <Typography sx={styles.source} variant='h6' display='block'>
                            {content[0]}
                        </Typography>
                        <Link href="" height="15rem" >
                            <CardMedia
                                sx={{ height: "inherit", objectFit: "fill" }}
                                component="img"
                                src={post.picture}

                            />
                        </Link>
                        <Typography sx={styles.source} variant='h6' display='block'>

                            {content[1]}
                            {content[2]}
                        </Typography>

                    </CardContent>

                </Card>
            </Container>
        </>
    );
}
