"use client"
import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import ShareIcon from '@mui/icons-material/Share'; // Import a share icon from Material UI
import { Facebook, LinkedIn, Twitter, WhatsApp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { config } from '@/global/config';

const ShareButton = ({ postId }: { postId: number }) => {
    const url = `${config.getHostname()}/postDetails/${postId}`;
    const title = 'Check this out!';

    return (
        <>

            <FacebookShareButton url={url} title={title} style={{ marginRight: 8 }}>
                <Facebook />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title} style={{ marginRight: 8 }}>
                <Twitter />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} summary="Interesting content" source="Your Site Name" style={{ marginRight: 8 }}>
                <LinkedIn />
            </LinkedinShareButton>
            <WhatsappShareButton url={url} title={title} style={{ marginRight: 8 }}>
                <WhatsApp />
            </WhatsappShareButton>
        </>
    );
};

export default ShareButton;
