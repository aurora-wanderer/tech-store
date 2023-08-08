package org.techstore.fullstack.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.techstore.fullstack.model.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer>, JpaSpecificationExecutor<Category> {

    @Cacheable("findAllCategory")
    @EntityGraph(attributePaths = {"products", "products.reviews"})
    <T> List<T> findDistinctByCategoryName(String name, Class<T> klass);
}