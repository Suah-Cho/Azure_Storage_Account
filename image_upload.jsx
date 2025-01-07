const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');

require('dotenv').config();

// Get Azure Storage connection string
const AZURE_STORAGE_CONNECTION_STRING = process.env.STORAGE_ACCOUNT_CONNECTION_STRING;

// Crate BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
)

// container name
const containerName = 'test1-cropinsight-image-container';

// Image file path for uploading
const filePath = './images/photo1.jpeg';

const uploadImage = async (filePath) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = filePath.split('/').pop();

    console.log(`blobName : ${blobName}`);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Readn and upload image file
    const data = fs.readFileSync(filePath);
    await blockBlobClient.upload(data, data.length);

    console.log(`이미지 업로드 완료 : ${blobName}`)

};

uploadImage(filePath).catch((err) => {
    console.error('Error uploading Image: ', err.message);
});