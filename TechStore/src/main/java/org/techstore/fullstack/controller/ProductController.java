package org.techstore.fullstack.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techstore.fullstack.service.ProductService;
import org.techstore.fullstack.web.response.ProductDetailsResponse;
import org.techstore.fullstack.web.response.ProductResponse;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> fetchAllProduct() {
        List<ProductResponse> allProducts = productService.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }

    @GetMapping("/{categoryName}/all")
    public ResponseEntity<List<ProductResponse>> fetchProductsByCategoryName(@PathVariable("categoryName") String name) {
        List<ProductResponse> productsByCategoryName = productService.getAllProductsBy(name);
        return new ResponseEntity<>(productsByCategoryName, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailsResponse> fetchProductDetailsById(@PathVariable("id") Integer id) {
        ProductDetailsResponse productDetailsResponse = productService.getProductDetails(id);
        return new ResponseEntity<>(productDetailsResponse, HttpStatus.OK);
    }
}
