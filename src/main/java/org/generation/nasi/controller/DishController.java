package org.generation.nasi.controller;

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
        for (Dish image: itemService.all())
        {
            //productimages/t-shirt1.jpg
        String setURL = imageFolder + "/" + image.getImageUrl();
        image.setImageUrl(setURL);
        }

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
                //dish=(itemDto);
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