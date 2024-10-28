from azure.storage.blob import BlobServiceClient
from datetime import datetime, timezone, timedelta
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

STORAGE_ACCOUNT_NAME = os.getenv('STORAGE_ACCOUNT_NAME')
STORAGE_ACCOUNT_KEY = os.getenv('STORAGE_ACCOUNT_KEY')
CONTAINER_NAME = os.getenv('CONTAINER_NAME')

TARGET_TIER = 'Archive' 

archive_prefix = "archive/"

# BlobServiceClient 
blob_service_client = BlobServiceClient(
    account_url=f"https://{STORAGE_ACCOUNT_NAME}.blob.core.windows.net",
    credential=STORAGE_ACCOUNT_KEY
)

# ContainerClient
container_client = blob_service_client.get_container_client(CONTAINER_NAME)

def move_blob_to_archive(source, target, container_client):

    source_client = container_client.get_blob_client(source.name)
    target_client = container_client.get_blob_client(
        target + source.name.split('/')[-1]
    )
    target_client.start_copy_from_url(source_client.url)

    properties = target_client.get_blob_properties()
    while properties.copy.status != "success":
        properties = target_client.get_blob_properties()

    source_client.delete_blob()

def delete_blobs_with_tier():
    blobs = container_client.list_blobs(name_starts_with='done')
    i, j = 0, 0

    now = datetime.now(timezone.utc)

    for blob in blobs:
        i += 1
        if blob.creation_time < now - timedelta(days=1):
            j += 1
            print(f"{blob.name} , {blob.creation_time}")
            move_blob_to_archive(blob, archive_prefix, container_client)
        # if blob.blob_tier == TARGET_TIER:
        #     container_client.delete_blob(blob.name)
        #     print(f"Deleted blob: {blob.name}")
    
    print(f"/done : {i}, target : {j}")

# 실행
delete_blobs_with_tier()