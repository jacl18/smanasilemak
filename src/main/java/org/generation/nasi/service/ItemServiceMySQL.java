package org.generation.nasi.service;

import org.generation.nasi.repository.DishRepository;
import org.generation.nasi.repository.entity.Dish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ItemServiceMySQL implements ItemService {

    //ItemServiceMySQL class will provide all the implementation of all the methods that is provided in the interface

    //which class object is this class dependent on?
    //This ItemServiceMySQL class has to depend on another class object to perform
    // actions (e.g. save, delete, all, findItemById
    //dependent object class is the CRUDRepository class that is provided by Spring boot

    //to perform dependency injection -> access the CRUDRepository class through the
    // ItemRepository interface that we have created

    //ItemRepository is an interface that extends CrudRepository interface
    private final DishRepository dishRepository;



    //Dependency Injection of another class object to this class object can be done with
    // @Autowired annotation

    public ItemServiceMySQL(@Autowired DishRepository dishRepository)
    {
        this.dishRepository = dishRepository;
    }


    @Override
    public Dish save(Dish dish)
    {
        //Since we have done the dependency injection of the dishRepository, therefore now we can call any method from the CrudRepository class
        return this.dishRepository.save(dish);

    }


    @Override
    public void delete(int dishId)
    {
       this.dishRepository.deleteById(dishId);
    }


    @Override
    public ArrayList<Dish> all()
    {
        // 1. @Query class provide by spring boot : select * from dish
        // 2. Repository class provided by spring boot. we do not need to write a single query
        ArrayList<Dish> result = new ArrayList<>();
        dishRepository.findAll().forEach(result::add);
        return result;

    }


    @Override
    public Dish findById(int dishId)
    {
        //Optional is list that accept either a null or with dish
        Optional<Dish> dish = dishRepository.findById(dishId);
        Dish itemResponse = dish.get();
        return itemResponse;

    }



}
