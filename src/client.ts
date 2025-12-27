import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const clientId: string = getEnvVar('CLIENT_ID');
const clientSecret: string = getEnvVar('CLIENT_SECRET');
const tenantId: string = getEnvVar('TENANT_ID');
const functionUrl: string = getEnvVar('FUNCTION_URL');

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const getToken = async (): Promise<string> => {
  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('scope', `api://${clientId}/.default`);

  const response = await axios.post<TokenResponse>(
    tokenEndpoint,
    params.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data.access_token;
};

const callFunction = async (): Promise<void> => {
  try {
    const token = await getToken();

    const response = await axios.post(
      functionUrl,
      'John Doe',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain',
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    process.exit(1);
  }
};

callFunction();
