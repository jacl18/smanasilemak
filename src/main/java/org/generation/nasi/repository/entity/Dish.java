package org.generation.nasi.repository.entity;

//Repository package is part of the Model Component (MVC)
//Item is the entity class to use to map against the table from the database

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.generation.nasi.controller.dto.ItemDTO;

@Entity
public class Dish {

    //Properties/attributes - will be mapped to the columns of the database table
    //Need to use the Wrapper class on primitive data types - need to pass the datatype
    // as an object to CRUDRepository Class (provided by SpringBoot framework)


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;             //retrieve product item by ID - has to be an object
    private String name;
    private String description;
    private float price;
    private String imageUrl;
    private String side;


    public Dish() {}


    public Dish(ItemDTO itemDTO)
    {
        //Transfer the object (with the data) to Entity Class for mapping with the
        // database table columns and to be able to save the data in the columns
        this.name = itemDTO.getName();
        this.description = itemDTO.getDescription();
        this.price = itemDTO.getPrice();
        this.imageUrl = itemDTO.getImageUrl();
        this.side = itemDTO.getSide();
    }


    public Integer getId()
    {
        return id;
    }


    public void setId( Integer id )
    {
        this.id = id;
    }


    public String getName()
    {
        return name;
    }


    public void setName( String name )
    {
        this.name = name;
    }


    public String getDescription()
    {
        return description;
    }


    public void setDescription( String description )
    {
        this.description = description;
    }


    public float getPrice()
    {
        return price;
    }


    public void setPrice( float price )
    {
        this.price = price;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }


    public void setImageUrl( String imageUrl )
    {
        this.imageUrl = imageUrl;
    }


    public String getSide()
    {
        return side;
    }


    public void setSide( String side )
    {
        this.side = side;
    }



    @Override
    public String toString()
    {
        return "Item{" + "id=" + id + ", name='" + name + '\'' + ", description='" +
                description + '\'' + ", imageUrl='"
                + imageUrl + '\'' + ",side='" + side + '\'' + ", price='" + price +
                '}';
    }
}

