import Image from 'next/image'
import styles from './page.module.css'
import { DataCards } from '../components/DataCards/page';
import { Fragment, use } from 'react';
import { cookies, headers } from 'next/headers'
import Loading from '@/components/loadingPage/loading';
import { config } from '@/global/config';
import { ssrRequest } from '@/global/request';
export default async function Home({ params, searchParams }: any) {

  // const apiKey = `78285c7db6124c0e807b5971f1f8fdb5`
  // const response = await fetch(`https://api.worldnewsapi.com/search-news?api-key=${apiKey}&source-countries=eg&language=en&offset=1&number=100&sort=publish-time&sort-direction=desc`)
  // const { news: posts }: any = await response.json()
  let country: any = cookies().get('country')?.value
  const query = {
    country,
    orderKey: searchParams.orderKey ?? "pubDate",
    orderValue: searchParams.orderValue ?? "DESC",
    page: searchParams.page ?? "1",
    limit: searchParams.limit ?? "10",
    search: searchParams.search ?? ''
  }
  const response = await ssrRequest(query)
  const posts = response.data

  return (
    // <main className={styles.main}>
    <Fragment>
      {posts?.length ? <DataCards response={response}></DataCards> : <Loading />}
    </Fragment>
    // </main>
  )
}
