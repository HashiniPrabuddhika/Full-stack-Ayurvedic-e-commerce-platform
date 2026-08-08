package com.myproject.foddiesapi.repository;

import com.myproject.foddiesapi.entity.ProductEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<ProductEntity,String> {



}
