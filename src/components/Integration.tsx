import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import DynamoDBNoSQLCRUD from './DynamoDBNoSQLCRUD';
import Login from './Login';
import S3FileStorage from './S3FileStorage';
import SystemList, { Systems } from './SystemList';

export type Component = 'Login' | 'S3FileStorage' | 'DynamoDBNoSQLCRUD';

export interface IntegrationProps {
    title: string,
    summary?: string,
    requiresLogin: boolean,
    systems: Systems,
    component?: Component,
    accessToken: string | null,
    loggedIn: boolean,
    setLoggedIn: (loggedIn: boolean) => void,
    apiURL: string,
}

export default function Integration({ title, summary, requiresLogin, systems, component, accessToken, loggedIn, setLoggedIn, apiURL }: IntegrationProps) {
    const requiresLoginElement = requiresLogin
        ? <Chip label="Requires login" sx={{ mr: 1, color: 'rgb(55 65 81)', bgcolor: 'rgb(236 254 255)' }} />
        : <></>;

    let componentElement = <></>;
    switch (component) {
        case 'Login':
            componentElement = Login(loggedIn);
            break;
        case 'S3FileStorage':
            componentElement = S3FileStorage(loggedIn, accessToken, apiURL, setLoggedIn);
            break;
        case 'DynamoDBNoSQLCRUD':
            componentElement = DynamoDBNoSQLCRUD(loggedIn, accessToken, apiURL, setLoggedIn);
            break;
        default:
            break;
    }

    return (
        <Box sx={{ bgcolor: 'rgb(236 254 255)', mb: 8, p: 2 }}>
            <Typography variant="h2" align="left" sx={{ color: 'rgb(55 65 81)' }} gutterBottom={true}>{title}</Typography>

            <Box sx={{ mb: 5, }}>
                <SystemList systems={systems}></SystemList>
                {summary
                    ? <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.contrastText', bgcolor: 'rgb(8 145 178)', my: 2, p: 2 }}>{requiresLoginElement} {summary}</Box>
                    : <></>
                }
            </Box>
            {componentElement}
        </Box>
    );
}