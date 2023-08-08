package org.techstore.fullstack.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.techstore.fullstack.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {

    @Cacheable("findAllProduct")
    @EntityGraph(attributePaths = {"category", "reviews"})
    <T> List<T> findAllBy(Class<T> info);


    @EntityGraph(attributePaths = {"category", "reviews", "reviews.customer"})
    @Cacheable(value = "findProductById", key = "#id.toString()")
    <T> T findById(Integer id, Class<T> type);

    @EntityGraph(attributePaths = {"category", "reviews"})
    @Cacheable(value = "findProductByCategoryName", key = "#categoryName")
    <T> List<T> findByCategory_CategoryName(String categoryName, Class<T> type);
}