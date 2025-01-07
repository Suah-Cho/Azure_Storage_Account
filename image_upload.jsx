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
const containerName = 'test1-cropinsight-images-container';

// Image file path for uploading
const filePath = './images/photo1.jpeg';

const uploadImage = async (filePath) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = filePath.split('/').pop();

    console.log('blobName: ', blobName);
    // const blockBlob

};

uploadImage(filePath).catch((err) => {
    console.error('Error uploading Image: ', err.message);
});