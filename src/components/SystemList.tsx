import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AWSAPIGatewayIcon from "./icons/AWSAPIGatewayIcon";
import AWSCertifcateManagerIcon from "./icons/AWSCertificateManagerIcon";
import AWSCloudFrontIcon from "./icons/AWSCloudFrontIcon";
import AWSCloudWatchIcon from "./icons/AWSCloudWatchIcon";
import AWSCodePipelineIcon from "./icons/AWSCodePipelineIcon";
import AWSCognitoIcon from "./icons/AWSCognitoIcon";
import AWSDynamoDBIcon from "./icons/AWSDynamoDBIcon";
import AWSIAMICon from "./icons/AWSIAMIcon";
import AWSLambdaIcon from "./icons/AWSLambdaIcon";
import AWSS3Icon from "./icons/AWSS3Icon";
import ReactIcon from "./icons/ReactIcon";
import TerraformIcon from "./icons/TerraformIcon";
import TypeScriptIcon from "./icons/TypeScriptIcon";

export type System =
    'AWS API Gateway' |
    'AWS Certificate Manager' |
    'AWS CloudFront' |
    'AWS CloudWatch' |
    'AWS CodePipeline' |
    'AWS Cognito' |
    'AWS DynamoDB' |
    'AWS IAM' |
    'AWS Lambda' |
    'AWS S3' |
    'React' |
    'Terraform' |
    'TypeScript';
export type Systems = Array<System>;

const systemIconMap: { [key in System]: () => JSX.Element } = {
    'AWS API Gateway': AWSAPIGatewayIcon,
    'AWS Certificate Manager': AWSCertifcateManagerIcon,
    'AWS CloudFront': AWSCloudFrontIcon,
    'AWS CloudWatch': AWSCloudWatchIcon,
    'AWS CodePipeline': AWSCodePipelineIcon,
    'AWS Cognito': AWSCognitoIcon,
    'AWS DynamoDB': AWSDynamoDBIcon,
    'AWS IAM': AWSIAMICon,
    'AWS Lambda': AWSLambdaIcon,
    'AWS S3': AWSS3Icon,
    'React': ReactIcon,
    'Terraform': TerraformIcon,
    'TypeScript': TypeScriptIcon,
}

export default function SystemList({ systems }: { systems: Systems }) {
    return (
        <Grid container spacing={2}>
            {systems.map(system => {
                return <Grid xs={12} sm={6} md={3} key={system}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: grey[50], bgcolor: grey[800] }}>
                        <Box sx={{ mr: 1, p: 0, height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {systemIconMap[system]()}
                        </Box>
                        <Typography>{system}</Typography>
                    </Box>
                </Grid>
            })}
        </Grid >
    );
}