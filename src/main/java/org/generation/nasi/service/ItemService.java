package org.generation.nasi.service;

import org.generation.nasi.repository.entity.Dish;

import java.util.ArrayList;

public interface ItemService {

    //save method is for 2 purposes - Create new item & Update existing item
    Dish save(Dish item);


    //Delete Dish from database - based on item Id
    void delete(int dishId);


    //Read all dish from database
    ArrayList<Dish> all();


    //Read an dish from database - based on dish Id
    Dish findById(int dishId);


}
