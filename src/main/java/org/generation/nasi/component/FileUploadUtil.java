package org.generation.nasi.component;


import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public class FileUploadUtil {

    public static void saveFile(String uploadDir1, String fileName, MultipartFile multipartFile) throws IOException {

        String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=productimagenasi;AccountKey=E5btTD5tfvsEvF1wS1aDOjyfcZGdPNN+nIhDXEscWDg5k/vYkv0PMDGC5vjK9UI4z0/6UEUsIUL5+ASt5JA1IA==;EndpointSuffix=core.windows.net";

        //Create a connection between this web application with the storage container we created in Azure Server
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();

        //Specify which container we want to get the images from
        String containerName = "prodimage";

        //to get the container with the images and save it to containerClient
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        //fileName refers to which image filename we want to upload(e.g. t-shirt_new.jpg)
        BlobClient blobClient = containerClient.getBlobClient(fileName);
        InputStream inputStream = multipartFile.getInputStream();
        //upload method provided by Azure
        blobClient.upload(inputStream);
    }

}//End of FileUploadUtil
