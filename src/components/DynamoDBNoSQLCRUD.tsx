import { ChangeEvent, useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface DatabaseEntry {
    id: { S: string };
    name: { S: string };
    price: { S: string };
}

type DatabaseEntries = Array<DatabaseEntry>;

export default function DynamoDBNoSQLCRUD(loggedIn: boolean, accessToken: string | null, apiURL: string, setLoggedIn: (loggedIn: boolean) => void) {
    const [databaseEntries, setDatabaseEntries] = useState<DatabaseEntries>([]);
    const [refreshDatabaseEntries, setRefreshDatabaseEntries] = useState(0);
    const [addEntryId, setAddEntryId] = useState('');
    const [addEntryName, setAddEntryName] = useState('');
    const [addEntryPrice, setAddEntryPrice] = useState('');
    const [getEntryId, setGetEntryId] = useState('');

    const onAddEntryIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAddEntryId(event.target.value);
    }

    const onAddEntryNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAddEntryName(event.target.value);
    }

    const onAddEntryPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAddEntryPrice(event.target.value);
    }

    const onGetEntryIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setGetEntryId(event.target.value);
    }

    const onRefreshClickHandler = () => {
        setRefreshDatabaseEntries(refreshDatabaseEntries + 1);
    };

    const onDeleteEntryClickHandler = (id: string) => {
        if (accessToken == null) {
            return;
        }

        fetch(`${apiURL}/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Content-Type': 'application/json;'
            },
        })
            .then((response) => { return response.json(); })
            .then((response) => {
                if (response.message === "Unauthorized") {
                    setLoggedIn(false);
                    return;
                }

                return response;
            })
            .then((response) => {
                setRefreshDatabaseEntries(refreshDatabaseEntries + 1);
            })
            .catch((error) => {
                alert(`Unable to delete entry with id ${id}`);
            });
    };

    const onAddEntryClickHandler = () => {
        if (accessToken == null) {
            return;
        }

        const entryData = {
            "id": addEntryId,
            "name": addEntryName,
            "price": addEntryPrice,
        };

        fetch(`${apiURL}/items`, {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify(entryData)
        })
            .then((response) => { return response.json(); })
            .then((response) => {
                if (response.message === "Unauthorized") {
                    setLoggedIn(false);
                    return;
                }

                return response;
            })
            .then((response) => {
                setAddEntryId('');
                setAddEntryName('');
                setAddEntryPrice('');
                setRefreshDatabaseEntries(refreshDatabaseEntries + 1);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const onGetEntryClickHandler = () => {
        const id = getEntryId;

        fetch(`${apiURL}/items/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Content-Type': 'application/json;'
            }
        })
            .then((response) => { return response.json(); })
            .then((response) => {
                if (response.message === "Unauthorized") {
                    setLoggedIn(false);
                    return;
                }

                return response;
            })
            .then((response) => {
                setGetEntryId('');
                alert(JSON.stringify(response));
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        let ignore = false;

        if (accessToken == null) {
            return () => {
                ignore = true;
            };
        }

        fetch(`${apiURL}/items`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Content-Type': 'application/json;'
            },
        })
            .then((response) => { return response.json(); })
            .then((response) => {
                if (response.message === "Unauthorized") {
                    setLoggedIn(false);
                    return [];
                }

                return response;
            })
            .then((data) => {
                if (!ignore) {
                    setDatabaseEntries(data);
                }
            })
            .catch((error) => {
                alert(error);
            });

        return () => {
            ignore = true;
        };
    }, [apiURL, accessToken, refreshDatabaseEntries, setLoggedIn]);

    if (!loggedIn) {
        return <></>;
    }

    return (
        <Box>
            <Typography variant="h3" align="left" sx={{ color: 'rgb(55 65 81)' }} gutterBottom={true}>
                Entries
                <Button variant="contained" sx={{ borderRadius: 0, mx: 2, bgcolor: 'rgb(8 145 178)', ':hover': { color: 'rgb(255, 255, 255)', bgcolor: 'rgb(55 65 81)' } }} onClick={onRefreshClickHandler}>Refresh</Button>
            </Typography>

            <Box sx={{ mb: 5 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Action(s)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {databaseEntries.map((databaseEntry) => (
                                <TableRow
                                    key={databaseEntry.id.S}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{databaseEntry.id.S}</TableCell>
                                    <TableCell align="left">{databaseEntry.name.S}</TableCell>
                                    <TableCell align="right">{databaseEntry.price.S}</TableCell>
                                    <TableCell align="right"><Button sx={{ borderRadius: 0 }} variant="contained" color="error" onClick={() => onDeleteEntryClickHandler(databaseEntry.id.S)}>Delete</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={6}>
                    <Box sx={{ mb: 5, maxWidth: '400px' }}>
                        <Typography variant="h3" align="left" sx={{ color: 'rgb(55 65 81)' }} gutterBottom={true}>Add entry</Typography>
                        <Stack spacing={1}>
                            <TextField label="Id" variant="outlined" sx={{ input: { bgcolor: grey[50] } }} value={addEntryId} onChange={onAddEntryIdChangeHandler} />
                            <TextField label="Name" variant="outlined" sx={{ input: { bgcolor: grey[50] } }} value={addEntryName} onChange={onAddEntryNameChangeHandler} />
                            <TextField label="Price" variant="outlined" sx={{ input: { bgcolor: grey[50] } }} value={addEntryPrice} onChange={onAddEntryPriceChangeHandler} />
                            <Button variant="contained" sx={{ borderRadius: 0, bgcolor: 'rgb(8 145 178)', ':hover': { color: 'rgb(255, 255, 255)', bgcolor: 'rgb(55 65 81)' } }} onClick={onAddEntryClickHandler}>Add entry</Button>
                        </Stack>
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                    <Box sx={{ mb: 5, maxWidth: '400px' }}>
                        <Typography variant="h3" align="left" sx={{ color: 'rgb(55 65 81)' }} gutterBottom={true}>Get entry</Typography>
                        <Stack spacing={1}>
                            <TextField label="Id" variant="outlined" sx={{ input: { bgcolor: grey[50] } }} value={getEntryId} onChange={onGetEntryIdChangeHandler} />
                            <Button variant="contained" sx={{ borderRadius: 0, bgcolor: 'rgb(8 145 178)', ':hover': { color: 'rgb(255, 255, 255)', bgcolor: 'rgb(55 65 81)' } }} onClick={onGetEntryClickHandler}>Get entry</Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid >
        </Box >
    );
}