import { DataCards } from "@/components/DataCards/page";
import posts from '../../../../test_posts.json'
import { Fragment } from "react";
import styles from '../../page.module.css'
import PostDetails from "@/components/postDetails/page";

// This is a client component 👈🏽

export default function Discover({ params }: { params: { postId: string } }) {
    let post = posts.find(element => element.id == +params.postId)
    let allPosts = [post, ...posts]

    return (
        <main className={styles.main}>
            {
                allPosts.map(post => (
                    <>
                        <PostDetails key={post!.id} post={post}></PostDetails>
                        <br />
                    </>
                ))
            }
        </main>
    )
}