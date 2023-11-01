import Image from 'next/image'
import styles from './page.module.css'
import { DataCards } from '../components/DataCards/page';
import { Fragment, use } from 'react';
import posts from './../../test_posts.json'


export default function Home() {
  return (
    <main className={styles.main}>
      <Fragment>
        <DataCards data={posts}></DataCards>
      </Fragment>
    </main>
  )
}
