package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.entity.ProductEntity;
import com.myproject.foddiesapi.io.ProductRequest;
import com.myproject.foddiesapi.io.FoodResponse;
import com.myproject.foddiesapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService {

    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private ProductRepository productRepository;

    public String uploadFile(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("secure_url");
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occured while uploading the file");
        }
    }

    @Override
    public FoodResponse addFood(ProductRequest request, MultipartFile file) {
        ProductEntity newProductEntity = convertToEntity(request);
        String imageUrl = uploadFile(file);
        newProductEntity.setImageUrl(imageUrl);
        newProductEntity = productRepository.save(newProductEntity);
        return convertToResponse(newProductEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<ProductEntity> databaseEntries = productRepository.findAll();
        return databaseEntries.stream()
                .map(object -> convertToResponse(object))
                .collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
        ProductEntity existingFood = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Food is not found for the id:" + id));
        return convertToResponse(existingFood);
    }

    @Override
    public boolean deleteFile(String filename) {
        try {
            String publicId = filename.contains(".")
                    ? filename.substring(0, filename.lastIndexOf("."))
                    : filename;
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return true;
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while deleting the file");
        }
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFood(id);
        String imageUrl = response.getImageUrl();
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        boolean isFileDelete = deleteFile(filename);
        if (isFileDelete) {
            productRepository.deleteById(response.getId());
        }
    }

    private ProductEntity convertToEntity(ProductRequest request) {
        return ProductEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(ProductEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}