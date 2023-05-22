import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Login(loggedIn: boolean) {
    const onClickHandler = () => {
        const loginURL = `https://integrations-demo.auth.eu-west-2.amazoncognito.com/login?client_id=117bg88akr6lk23ahq991bchdi&response_type=token&scope=email+openid&redirect_uri=${window.location.href}`;
        window.location.href = loginURL;
    };

    if (loggedIn) {
        return <></>;
    }

    return (
        <Box sx={{ mt: 8, mb: 5, textAlign: 'center' }}>
            <Button variant="contained" sx={{ fontSize: '2rem', borderRadius: 0, bgcolor: 'rgb(8 145 178)', ':hover': { color: 'rgb(255, 255, 255)', bgcolor: 'rgb(55 65 81)' } }} onClick={onClickHandler}>Login</Button>
        </Box>
    );
}