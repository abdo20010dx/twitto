
import * as React from 'react';
import { CardData } from './Card';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid } from './DataGrid';
import Carousel from './carousel';


interface Cards {
    data: CardData[]
}

export function DataCards({ data }: Cards) {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Carousel posts={data.slice(0, 4)} />
                <br />
                <Grid container spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }} direction={'row'} >

                    <Grid container spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }} lg={3} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    </Grid>

                    <Grid container spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }} lg={9} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>

                        {

                            data.map(
                                (post, index) => [0, 1, 5, 6, 10, 11].includes(index) ? (<DataGrid post={post} key={post.id} lg={6} />) : (<DataGrid post={post} key={post.id} />)
                            )
                        }
                    </Grid>
                </Grid>
            </Box>

        </>
    );
}

export { }