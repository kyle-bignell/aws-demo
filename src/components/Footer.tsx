
import React from "react";
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Link from '@mui/material/Link';

export default function Footer() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, color: grey[50], bgcolor: grey[700] }}>
            <Box>
                © 2023 Copyright: <Link sx={{ color: 'rgb(8 145 178)', textDecorationColor: 'rgb(8 145 178)' }} href="https://kylebignell.co.uk">Kyle Bignell</Link>
            </Box>
        </Box>
    );
};