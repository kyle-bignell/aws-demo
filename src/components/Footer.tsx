
import React from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Footer() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, color: 'rgb(229 231 235)', bgcolor: 'rgb(55 65 81)' }}>
            <Box>
                © 2023 Copyright: <Link sx={{ color: 'rgb(8 145 178)', textDecorationColor: 'rgb(8 145 178)' }} href="https://kylebignell.co.uk">Kyle Bignell</Link>
            </Box>
        </Box>
    );
};