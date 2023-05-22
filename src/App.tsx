import { useState } from 'react';
import { blue, blueGrey } from '@mui/material/colors';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Integration, { Component } from './components/Integration';
import { Systems } from './components/SystemList';
import Footer from './components/Footer';

interface IntegrationData {
  title: string;
  summary: string;
  requiresLogin: boolean;
  systems: Systems;
  component?: Component;
}

const integrations: Array<IntegrationData> = [
  {
    title: 'Cognito - Account Management',
    summary: 'All integrations are protected behind user logins. AWS Cognito provides a JWT token that is used to authenticate against the APIs exposed by the API Gateway.',
    requiresLogin: false,
    systems: [
      'AWS Cognito',
      'AWS IAM'
    ],
    component: 'Login',
  },
  {
    title: 'S3 - File Storage',
    summary: 'Retrieve a list of all files stored in the demo bucket and allow uploads of new files.',
    requiresLogin: true,
    systems: [
      'AWS API Gateway',
      'AWS Lambda',
      'AWS S3',
      'AWS IAM'
    ],
    component: 'S3FileStorage',
  },
  {
    title: 'DynamoDB - NoSQL CRUD',
    summary: 'Update entries in the NoSQL DynamoDB database using a rudimentary CRUD app.',
    requiresLogin: true,
    systems: [
      'AWS API Gateway',
      'AWS Lambda',
      'AWS DynamoDB',
      'AWS IAM'
    ],
    component: 'DynamoDBNoSQLCRUD',
  },
  {
    title: 'CloudFront + S3 - Static Website Hosting',
    summary: 'This demo is hosted in a S3 bucket which is automatically deployed to when any new code is pushed to GitHub using an AWS CodePipeline integration. The subdomain of kylebignell.co.uk is pointed to the AWS S3 bucket and SSL is provided using AWS CloudFront and Certificate Manager.',
    requiresLogin: false,
    systems: [
      'AWS CloudFront',
      'AWS S3',
      'AWS CodePipeline',
      'AWS Certificate Manager'
    ]
  },
  {
    title: 'Misc.',
    summary: '',
    requiresLogin: false,
    systems: [
      'AWS CloudWatch'
    ]
  },
];

let theme = createTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    secondary: {
      main: blueGrey[500]
    },
  },
  typography: {
    fontSize: 14,
  },
});
theme = responsiveFontSizes(theme);

export default function App() {
  const urlSearchParams = new URLSearchParams(window.location.hash.substring(1));

  const [accessToken] = useState(urlSearchParams.get('access_token'));
  const [loggedIn, setLoggedIn] = useState(accessToken ? true : false);
  const apiURL = "https://ti7ac8cxbc.execute-api.eu-west-2.amazonaws.com/aws_demo_lambda_stage";

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h1" align="center" sx={{ color: 'rgb(55 65 81)', my: 8 }}>AWS Integrations Demo</Typography>

        <Stack>
          {integrations.map(integration => {
            return <Integration
              key={integration.title}
              title={integration.title}
              summary={integration.summary}
              requiresLogin={integration.requiresLogin}
              systems={integration.systems}
              component={integration.component}
              accessToken={accessToken}
              loggedIn={loggedIn}
              apiURL={apiURL}
              setLoggedIn={setLoggedIn}></Integration>
          })}
        </Stack>

        <Alert sx={{ mb: 5 }} severity="info">
          AWS icons by <a href="https://awsicons.dev/">https://awsicons.dev/</a>. Source code available on <a href="https://github.com/kyle-bignell/aws-front-end-demo">GitHub</a>.
        </Alert>
      </Container>
      <Footer></Footer>
    </ThemeProvider>
  );
}
