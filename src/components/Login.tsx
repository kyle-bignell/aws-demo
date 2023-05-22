import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login(loggedIn: boolean) {
    const onClickHandler = () => {
        const loginURL = `https://integrations-demo.auth.eu-west-2.amazoncognito.com/login?client_id=117bg88akr6lk23ahq991bchdi&response_type=token&scope=email+openid&redirect_uri=${window.location.href}`;
        window.location.href = loginURL;
    };

    if (loggedIn) {
        return <></>;
    }

    return (
        <div>
            <Typography variant="h3" align="left" sx={{ color: 'rgb(55 65 81)' }} gutterBottom={true}>Login</Typography>
            <Button variant="contained" sx={{ bgcolor: 'rgb(8 145 178)', ':hover': { color: 'rgb(255, 255, 255)', bgcolor: 'rgb(55 65 81)' } }} onClick={onClickHandler}>Login</Button>
        </div>
    );
}