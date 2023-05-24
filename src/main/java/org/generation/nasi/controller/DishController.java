package org.generation.nasi.controller;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.generation.nasi.controller.dto.ItemDTO;
import org.generation.nasi.repository.entity.Dish;
import org.generation.nasi.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class DishController {


    private final ItemService itemService;

    @Value("${image.folder}")
    private String imageFolder;

    // Dependency injection of the itemservice object so that the controller can call any methods in the itemserviceMySQL class
    public DishController(@Autowired ItemService itemService) {
        this.itemService = itemService;
    }
    @CrossOrigin
    @GetMapping("/all")
    public Iterable<Dish> getItems() {

        //To display images from local folder
//        for (Dish image: itemService.all())
//        {
//            //productimages/nasi0.jpg
//        String setURL = imageFolder + "/" + image.getImageUrl();
//        image.setImageUrl(setURL);
//        }



        /* To display images from the Server Container */
        String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=productimagenasi;AccountKey=E5btTD5tfvsEvF1wS1aDOjyfcZGdPNN+nIhDXEscWDg5k/vYkv0PMDGC5vjK9UI4z0/6UEUsIUL5+ASt5JA1IA==;EndpointSuffix=core.windows.net";

        //System.out.println("Connect String: " + connectStr2);
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();
        String containerName = "prodimage";
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        //productimagespring
        BlobClient blobClient = containerClient.getBlobClient(itemService.all().get(0).getImageUrl());
        System.out.println(blobClient);


        //Loop through the ArrayList of itemService.all() and append the Blob url to the imageUrl
        for (Dish image: itemService.all())
        {
            //path: productimagenasi/prodimage/nasi0,jpg
            String setURL = blobClient.getAccountUrl() + "/" + containerName + "/" + image.getImageUrl();
            image.setImageUrl(setURL);
            System.out.println(setURL);

        }
        /* End of codes to display images from the Server Container */



        return itemService.all();
    }



    @CrossOrigin
    @PostMapping("/save")
    public void saveOrUpdate(@RequestParam(name = "id", required = false) Integer id,
                             @RequestParam(name = "name", required = true) String name,
                             @RequestParam(name = "description", required = true) String description,
                             @RequestParam(name = "price", required = true) float price,
                             @RequestParam(name = "imageUrl", required = true) String imageUrl,
                             @RequestParam(name = "side", required = false) String side) throws IOException {

        ItemDTO itemDto = new ItemDTO(name, description, price, imageUrl, side);
        if (id == null) {
            itemService.save(new Dish(itemDto));
        } else {
            Dish dish = itemService.findById(id);
            if (dish != null) {
                dish.setName(name);
                dish.setDescription(description);
                dish.setPrice(price);
                dish.setImageUrl(imageUrl);
                dish.setSide(side);

            itemService.save(dish);
            }
        }
    }
    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id )
    {
        itemService.delete( id );
    }

} // End of class