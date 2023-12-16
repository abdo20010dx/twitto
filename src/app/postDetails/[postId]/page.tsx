import { DataCards } from "@/components/DataCards/page";
import posts from '../../../../test_posts.json'
import { Fragment } from "react";
import styles from '../../page.module.css'
import PostDetails from "@/components/postDetails/page";
import { CardData } from "@/components/DataCards/Card";
import Loading from "@/components/loadingPage/loading";
import { config } from "@/global/config";
import { headers } from "next/headers";

// This is a client component 👈🏽

export default async function Discover({ params }: Readonly<{ params: { postId: string } }>) {
    const header = headers()
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    const userAgent: any = header.get("user-agent")

    let { data: post }: { data: CardData } = await (await fetch(`${config.hostname}/posts/${params.postId}`, {
        cache: "no-cache", headers: {
            fingerPrint: userAgent,
            clientIp: ip
        }
    })).json();
    return (
        <>
            <br />
            {post ? <PostDetails key={post.id} post={post}></PostDetails> : <Loading />}
        </>
    )
}