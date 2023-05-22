import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface File {
    Key: string;
    Size: number;
    LastModified: string;
}

type Files = Array<File>;

export default function S3FileStorage(loggedIn: boolean, accessToken: string | null, apiURL: string, setLoggedIn: (loggedIn: boolean) => void) {
    const [fileList, setFileList] = useState<Files>([]);
    const [refreshFileList, setRefreshFileList] = useState(0);

    const onRefreshClickHandler = () => {
        setRefreshFileList(refreshFileList + 1);
    };

    const onUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (accessToken == null) {
            return;
        }

        if (event.target.files == null) {
            return;
        }

        var file = event.target.files[0];

        const filepathData = {
            "file": {
                "name": file.name,
                "type": file.type
            }
        };

        fetch(`${apiURL}/filepath`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify(filepathData)
        })
            .then((response) => { return response.json(); })
            .then((response) => {
                if (response.message === "Unauthorized") {
                    setLoggedIn(false);
                    return [];
                }

                if (!response.uploadURL) {
                    throw new Error("Unable to upload file, no signed URL provided by AWS.");
                }

                return response;
            })
            .then((response) => {
                return fetch(response.uploadURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': file.type
                    },
                    body: file
                });
            })
            .then((response) => {
                setRefreshFileList(refreshFileList + 1);
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

        fetch(`${apiURL}/files`, {
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

                return response.data.Contents;
            })
            .then((data) => {
                if (!ignore) {
                    setFileList(data);
                }
            })
            .catch((error) => {
                alert(error);
            });

        return () => {
            ignore = true;
        };
    }, [apiURL, accessToken, refreshFileList, setLoggedIn]);

    if (!loggedIn) {
        return <></>;
    }

    return (
        <Box>
            <Typography variant="h3" align="left" sx={{ color: 'rgb(55 65 81)' }} gutterBottom={true}>
                Files
                <Button variant="contained" sx={{ borderRadius: 0, mx: 2, bgcolor: 'rgb(8 145 178)', ':hover': { color: 'rgb(255, 255, 255)', bgcolor: 'rgb(55 65 81)' } }} onClick={onRefreshClickHandler}>Refresh</Button>
            </Typography>

            <Box sx={{ mb: 5 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>File</TableCell>
                                <TableCell align="right">Size</TableCell>
                                <TableCell align="right">Last Modified</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fileList.map((file) => (
                                <TableRow
                                    key={file.Key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{file.Key}</TableCell>
                                    <TableCell align="right">{file.Size}</TableCell>
                                    <TableCell align="right">{file.LastModified}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box sx={{ mb: 5 }}>
                <Typography variant="h3" align="left" sx={{ color: 'rgb(55 65 81)' }} gutterBottom={true}>File upload</Typography>
                <Button variant="contained" sx={{ borderRadius: 0, bgcolor: 'rgb(8 145 178)', ':hover': { color: 'rgb(255, 255, 255)', bgcolor: 'rgb(55 65 81)' } }} component="label">
                    Upload File
                    <input
                        type="file" onChange={onUploadChangeHandler} hidden
                    />
                </Button>
            </Box>
        </Box>
    );
}