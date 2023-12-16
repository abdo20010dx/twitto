"use client"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRouter, useSearchParams } from 'next/navigation';


export default function PaginatePosts({ totalPages }: any) {
    const SearchParams = useSearchParams()
    const router = useRouter()
    const pageParams = SearchParams.get("page") ?? 1

    const handlePagination = (event: any, page: any) => {
        const search = SearchParams.get("search")
        const checkSearch = search ? `&search=${search}` : ''
        router.push(`?page=${page}${checkSearch}`)
    }
    return (
        <Stack sx={{ margin: "2em" }} spacing={2}>
            <Pagination page={+pageParams} count={totalPages} color="primary" onChange={handlePagination} />
        </Stack>
    );

}
