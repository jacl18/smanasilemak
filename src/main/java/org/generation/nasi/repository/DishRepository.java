package org.generation.nasi.repository;


import org.generation.nasi.repository.entity.Dish;
import org.springframework.data.repository.CrudRepository;

public interface DishRepository extends CrudRepository<Dish, Integer> {

}
