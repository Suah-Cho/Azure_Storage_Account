# Upload Image to Azure Blob Storage

1. Get Storage Account Connection String from Azure Portal
The connection string for the development storage account can be found at the following link:
[azure storage account](https://portal.azure.com/#@wrleecroftai.onmicrosoft.com/resource/subscriptions/3d2bd6cd-c2ca-49d5-9347-0dc032d0c355/resourceGroups/test1-resource-group/providers/Microsoft.Storage/storageAccounts/croftdevst/keys)

2. Set .env file
Create a .env file in the root directory of the project and add the following content:
```.env
STORAGE_ACCOUNT_CONNECTION_STRING=<connection_string>

```

3. Install the required packages
```bash

npm install @azure/storage-blob 
npm install dotenv

```
