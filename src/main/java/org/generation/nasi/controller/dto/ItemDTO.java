package org.generation.nasi.controller.dto;



public class ItemDTO {


    private String name;
    private String description;
    private float price;
    private String imageUrl;
    private String side;


    public ItemDTO(String name, String description, float price, String imageUrl, String side) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.side = side;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public void setPrice(float price) {
        this.price = price;
    }


    public float getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }


    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public void setSide(String side) {
        this.side = side;
    }


    public String getSide() {
        return side;
    }

}
