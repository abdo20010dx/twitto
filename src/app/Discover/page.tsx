import { DataCards } from "@/components/DataCards/page";
import posts from '../../../test_posts.json'
import { Fragment } from "react";
import styles from '../page.module.css'

// This is a client component 👈🏽

export default function Discover() {

    return (
        <main className={styles.main}>
            <DataCards data={posts} ></DataCards>
        </main>
    )
}