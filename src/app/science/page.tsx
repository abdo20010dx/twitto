import { DataCards } from "@/components/DataCards/page";
import posts from '../../../test_posts.json'
import { Fragment } from "react";
import { cookies } from "next/headers";
import Loading from "@/components/loadingPage/loading";
import { config } from "@/global/config";
import { ssrRequest } from "@/global/request";

// This is a client component 👈🏽

export default async function Discover({ params, searchParams }: any) {
    const theDirename = __dirname.split("/")
    const category = theDirename[theDirename.length - 1]

    let country: any = cookies().get('country')?.value
    const query = {
        category,
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
        <>
            {posts?.length ? <DataCards response={response}></DataCards> : <Loading />}
        </>
    )
}