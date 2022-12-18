import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function RebootPagination() {
    return (
        <Stack spacing={2}>

            <Pagination count={12} color="primary" />

        </Stack>
    );
}