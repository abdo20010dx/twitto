
import * as React from 'react';
import { CardData } from './Card';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid } from './DataGrid';
import Carousel from './carousel';
import PaginatePosts from '../footer/pagination';


interface Cards {
    response: {
        data: CardData[],
        meta: {
            total: number,
            total_pages: number,
            current_page: number,
            per_page: number,
            startItemInPage: number,

        }

    }
}

export function DataCards({ response: { data, meta } }: Readonly<Cards>) {
    let start = -1
    let end = 2

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Carousel posts={data.slice(0, 4)} />
            <br />
            <Grid container spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }} direction={'row'} >

                <Grid container spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }} lg={3} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                </Grid>

                <Grid container spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }} lg={12} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>

                    {

                        data.map(
                            (post, index) => {
                                if (index > start && index < end) {
                                    if (index == end - 1) { start += 5; end += 5; }

                                    return (<DataGrid post={post} key={post.id} lg={6} md={6} />)
                                }
                                return (<DataGrid post={post} key={post.id} />)
                            }

                        )
                    }
                </Grid>
            </Grid>
            <PaginatePosts totalPages={meta.total_pages}></PaginatePosts>
        </Box>
    );
}

export { }