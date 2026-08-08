package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.io.ProductRequest;
import com.myproject.foddiesapi.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    String uploadFile(MultipartFile file);

    FoodResponse addFood(ProductRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    boolean deleteFile(String filename);

    void deleteFood(String id);
}
