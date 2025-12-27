# Azure Function Test Client

A TypeScript client application that authenticates with Azure AD using OAuth2 client credentials flow and makes authenticated requests to an Azure Function.

## Features

- 🔐 OAuth2 client credentials authentication with Azure AD
- 📝 TypeScript with full type safety
- 🔒 Environment variable configuration for sensitive credentials
- 🛡️ Comprehensive error handling
- 📦 ES modules support

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- An Azure AD App Registration with:
  - Client ID
  - Client Secret
  - Tenant ID
- An Azure Function endpoint URL

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   git clone https://github.com/szentesik/azure-functions-oauth2-testclient.git
   cd azure-functions-oauth2-testclient
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the project root directory:
   ```bash
   touch .env
   ```

2. Add your Azure AD and Azure Function credentials to the `.env` file:
   ```env
   CLIENT_ID=your_azure_ad_client_id
   CLIENT_SECRET=your_azure_ad_client_secret
   TENANT_ID=your_azure_ad_tenant_id
   FUNCTION_URL=https://your-function-app.azurewebsites.net/api/your-function
   ```

   **Important:** Never commit the `.env` file to version control. Make sure it's listed in your `.gitignore`.

## Usage

### Build the Project

Compile TypeScript to JavaScript:
```bash
npm run build
```

### Run the Application

After building, run the compiled JavaScript:
```bash
npm start
```

Or run directly with TypeScript (if you have `ts-node` installed):
```bash
npx ts-node src/client.ts
```

## How It Works

1. **Authentication**: The application authenticates with Azure AD using the OAuth2 client credentials flow to obtain an access token.

2. **API Call**: Once authenticated, it makes a POST request to your Azure Function endpoint with:
   - The access token in the `Authorization` header
   - Plain text data in the request body (currently set to "John Doe")

3. **Response**: The function response is logged to the console.

## Project Structure

```
testclient/
├── src/
│   └── client.ts          # Main application code
├── dist/                  # Compiled JavaScript output
│   ├── client.js
│   ├── client.d.ts        # TypeScript definitions
│   └── ...
├── .env                   # Environment variables (not in repo)
├── package.json
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## Dependencies

### Runtime Dependencies
- **axios** (^1.13.2): HTTP client for making API requests
- **dotenv** (^17.2.3): Loads environment variables from `.env` file

### Development Dependencies
- **typescript** (^5.9.3): TypeScript compiler
- **@types/node** (^25.0.3): TypeScript type definitions for Node.js

## Customization

### Changing the POST Data

To send different data to your Azure Function, modify the data in `src/client.ts`:

```typescript
const response = await axios.post(
  functionUrl,
  'Your custom text here',  // Change this
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
  }
);
```

### Changing the Request Method

If you need to use a different HTTP method (GET, PUT, DELETE, etc.), replace `axios.post` with the appropriate method:

```typescript
// For GET request
const response = await axios.get(functionUrl, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Error Handling

The application includes comprehensive error handling:
- Missing environment variables will throw descriptive errors
- HTTP errors are caught and logged with status codes and response data
- Network errors are handled gracefully

## Troubleshooting

### "Missing required environment variable" Error
- Ensure your `.env` file exists in the project root
- Verify all required variables are set: `CLIENT_ID`, `CLIENT_SECRET`, `TENANT_ID`, `FUNCTION_URL`

### Authentication Errors
- Verify your Azure AD credentials are correct
- Check that your Azure AD app registration has the correct permissions
- Ensure the scope format matches: `api://{CLIENT_ID}/.default`

### Connection Errors
- Verify your Azure Function URL is correct and accessible
- Check network connectivity
- Ensure the Azure Function is running and accepting requests

## License

ISC

## Author

See package.json for author information.

